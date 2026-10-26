import { emptyDoc } from './content';
import type { Section, SectionSettings, SectionType } from './types';

export const DEFAULT_SETTINGS: SectionSettings = { background: 'none', spacing: 'm', animation: 'fade' };

export function newId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export interface SectionMeta {
  type: SectionType;
  label: string;
  description: string;
}

// Палитра конструктора — порядок как в админке
export const SECTION_META: SectionMeta[] = [
  { type: 'hero', label: 'Hero', description: 'Обложка статьи: на весь экран, заголовок + фото или разделённый экран' },
  { type: 'text', label: 'Текст', description: 'Абзацы, подзаголовки, списки, ссылки' },
  { type: 'image', label: 'Изображение', description: 'Фото в колонку, широкое или на весь экран' },
  { type: 'gallery', label: 'Слайдер', description: 'Несколько фото с подписями, свайп и стрелки' },
  { type: 'textImage', label: 'Текст + фото', description: 'Две колонки, можно закрепить фото при прокрутке' },
  { type: 'imageGrid', label: 'Сетка фото', description: '2–4 фото в одной из раскладок' },
  { type: 'quote', label: 'Цитата', description: 'Крупная акцентная цитата' },
  { type: 'fact', label: 'Факт / цифра', description: 'Большое число с анимацией счётчика' },
  { type: 'video', label: 'Видео', description: 'YouTube, VK Видео или RuTube по ссылке' },
  { type: 'cta', label: 'CTA', description: 'Призыв вызвать специалиста, телефон и кнопка' },
  { type: 'faq', label: 'FAQ', description: 'Вопросы и ответы, разметка FAQPage' },
  { type: 'divider', label: 'Разделитель', description: 'Линия, орнамент или отступ' },
];

export function sectionLabel(type: SectionType): string {
  return SECTION_META.find((m) => m.type === type)?.label ?? type;
}

export function createSection(type: SectionType): Section {
  const base = { id: newId(), settings: { ...DEFAULT_SETTINGS } };
  switch (type) {
    case 'hero':
      return { ...base, type, variant: 'title-image', image: null, subtitle: '', settings: { ...base.settings, animation: 'none' } };
    case 'text':
      return { ...base, type, doc: emptyDoc(), width: 'narrow' };
    case 'image':
      return { ...base, type, image: null, caption: '', layout: 'wide' };
    case 'gallery':
      return { ...base, type, items: [] };
    case 'textImage':
      return { ...base, type, doc: emptyDoc(), image: null, imageSide: 'right', sticky: false };
    case 'imageGrid':
      return { ...base, type, items: [], layout: 'equal' };
    case 'quote':
      return { ...base, type, text: '', author: '' };
    case 'fact':
      return { ...base, type, value: 100, decimals: 0, prefix: '', suffix: '%', label: '' };
    case 'video':
      return { ...base, type, url: '', title: '', poster: null };
    case 'cta':
      return {
        ...base,
        type,
        title: 'Нужна обработка объекта?',
        text: 'Специалист приедет в удобное время, подготовит договор и документы для проверок.',
        buttonLabel: 'Вызвать специалиста',
        buttonHref: '/contacts',
        showPhone: true,
        settings: { ...base.settings, background: 'card' },
      };
    case 'faq':
      return { ...base, type, title: 'Частые вопросы', items: [] };
    case 'divider':
      return { ...base, type, style: 'line', settings: { ...base.settings, animation: 'none' } };
  }
}

// Копия секции с новыми id (для «дублировать»)
export function cloneSection(section: Section): Section {
  const copy = structuredClone(section);
  copy.id = newId();
  if (copy.type === 'gallery' || copy.type === 'imageGrid') copy.items = copy.items.map((i) => ({ ...i, id: newId() }));
  if (copy.type === 'faq') copy.items = copy.items.map((i) => ({ ...i, id: newId() }));
  return copy;
}
