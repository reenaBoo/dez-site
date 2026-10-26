import type { FaqItem, RichDoc, RichMark, RichNode, Section } from './types';

// ─── Санитизация текста из редактора ─────────────────────────────────────
// Пропускаются только разрешённые узлы и метки; ссылки — только http(s), mailto, tel
// и внутренние пути. Применяется при сохранении и повторно при выводе.

const BLOCK_NODES = new Set(['paragraph', 'heading', 'bulletList', 'orderedList', 'listItem', 'blockquote']);
const INLINE_NODES = new Set(['text', 'hardBreak']);

export function safeHref(href: unknown): string | null {
  if (typeof href !== 'string') return null;
  const value = href.trim();
  if (/^\/(?!\/)/.test(value) || value.startsWith('#')) return value;
  if (/^(https?:|mailto:|tel:)/i.test(value)) {
    try {
      // Отбрасываем то, что не парсится как URL (в т. ч. попытки `javascript:` в обёртке)
      return new URL(value).href;
    } catch {
      return null;
    }
  }
  return null;
}

export function isInternalHref(href: string): boolean {
  return href.startsWith('/') || href.startsWith('#');
}

function sanitizeMarks(marks: RichMark[] | undefined): RichMark[] | undefined {
  if (!Array.isArray(marks)) return undefined;
  const out: RichMark[] = [];
  for (const mark of marks) {
    if (mark?.type === 'bold' || mark?.type === 'italic') out.push({ type: mark.type });
    if (mark?.type === 'link') {
      const href = safeHref(mark.attrs?.href);
      if (href) out.push({ type: 'link', attrs: { href } });
    }
  }
  return out.length ? out : undefined;
}

function sanitizeNode(node: RichNode): RichNode | null {
  if (!node || typeof node.type !== 'string') return null;

  if (node.type === 'text') {
    if (typeof node.text !== 'string' || !node.text) return null;
    const marks = sanitizeMarks(node.marks);
    return { type: 'text', text: node.text.slice(0, 20000), ...(marks && { marks }) };
  }
  if (node.type === 'hardBreak') return { type: 'hardBreak' };
  if (!BLOCK_NODES.has(node.type) && !INLINE_NODES.has(node.type)) return null;

  const content = Array.isArray(node.content)
    ? node.content.map(sanitizeNode).filter((n): n is RichNode => n !== null)
    : undefined;

  if (node.type === 'heading') {
    const level = node.attrs?.level === 3 ? 3 : 2;
    return { type: 'heading', attrs: { level }, ...(content && { content }) };
  }
  if (node.type === 'orderedList') {
    const start = typeof node.attrs?.start === 'number' ? Math.max(1, Math.floor(node.attrs.start)) : 1;
    return { type: 'orderedList', attrs: { start }, ...(content && { content }) };
  }
  return { type: node.type, ...(content && { content }) };
}

export function sanitizeDoc(doc: unknown): RichDoc {
  const content = (doc as RichDoc | undefined)?.content;
  if (!Array.isArray(content)) return emptyDoc();
  return {
    type: 'doc',
    content: content.map(sanitizeNode).filter((n): n is RichNode => n !== null),
  };
}

export function emptyDoc(): RichDoc {
  return { type: 'doc', content: [{ type: 'paragraph' }] };
}

// Быстрый конструктор документа для сида и шаблонов
export function docFromParagraphs(...blocks: (string | { h2: string } | { h3: string } | { list: string[] })[]): RichDoc {
  return {
    type: 'doc',
    content: blocks.map((block): RichNode => {
      if (typeof block === 'string') return { type: 'paragraph', content: [{ type: 'text', text: block }] };
      if ('h2' in block) return { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: block.h2 }] };
      if ('h3' in block) return { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: block.h3 }] };
      return {
        type: 'bulletList',
        content: block.list.map((item) => ({
          type: 'listItem',
          content: [{ type: 'paragraph', content: [{ type: 'text', text: item }] }],
        })),
      };
    }),
  };
}

// ─── Извлечение данных из секций ─────────────────────────────────────────

export function nodeText(node: RichNode): string {
  if (node.type === 'text') return node.text ?? '';
  if (node.type === 'hardBreak') return ' ';
  return (node.content ?? []).map(nodeText).join(node.type === 'paragraph' || node.type === 'heading' ? '' : ' ');
}

export function docText(doc: RichDoc | undefined): string {
  return (doc?.content ?? []).map(nodeText).join('\n');
}

export function sectionText(section: Section): string {
  switch (section.type) {
    case 'text':
    case 'textImage':
      return docText(section.doc);
    case 'quote':
      return section.text;
    case 'fact':
      return section.label;
    case 'cta':
      return `${section.title} ${section.text}`;
    case 'faq':
      return section.items.map((i) => `${i.question} ${i.answer}`).join(' ');
    case 'image':
      return section.caption ?? '';
    case 'gallery':
    case 'imageGrid':
      return section.items.map((i) => i.caption ?? '').join(' ');
    case 'hero':
      return section.subtitle ?? '';
    default:
      return '';
  }
}

const WORDS_PER_MINUTE = 180;

export function computeReadingTime(sections: Section[]): number {
  const words = sections.map(sectionText).join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function wordCount(sections: Section[]): number {
  return sections.map(sectionText).join(' ').split(/\s+/).filter(Boolean).length;
}

export function collectFaq(sections: Section[]): FaqItem[] {
  return sections.flatMap((s) => (s.type === 'faq' ? s.items : []))
    .filter((i) => i.question.trim() && i.answer.trim());
}

export interface TocItem {
  id: string;
  text: string;
}

// Якорь заголовка: детерминированный, совпадает при рендере и в оглавлении
export function headingAnchor(text: string, index: number): string {
  const base = text.toLowerCase().replace(/[^a-zа-яё0-9]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 48);
  return `h-${index + 1}-${base || 'razdel'}`;
}

export function collectToc(sections: Section[]): TocItem[] {
  const items: TocItem[] = [];
  for (const section of sections) {
    if (section.type !== 'text' && section.type !== 'textImage') continue;
    for (const node of section.doc.content) {
      if (node.type === 'heading' && node.attrs?.level === 2) {
        const text = nodeText(node).trim();
        if (text) items.push({ id: headingAnchor(text, items.length), text });
      }
    }
  }
  return items;
}

export function collectLinks(sections: Section[]): string[] {
  const links: string[] = [];
  const walk = (node: RichNode) => {
    node.marks?.forEach((m) => { if (m.type === 'link' && m.attrs?.href) links.push(m.attrs.href); });
    node.content?.forEach(walk);
  };
  for (const section of sections) {
    if (section.type === 'text' || section.type === 'textImage') section.doc.content.forEach(walk);
    if (section.type === 'cta') links.push(section.buttonHref);
  }
  return links;
}
