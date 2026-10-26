'use client';

import { useDeferredValue, useState } from 'react';
import styled from 'styled-components';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { MediaRef, Section } from '@/lib/news/types';
import { collectLinks, isInternalHref, nodeText, wordCount } from '@/lib/news/content';
import { SITE_URL } from '@/lib/site';
import { Field, Input, Muted, Panel, PanelTitle, Segmented, Textarea } from '../ui';

const Snippet = styled.div<{ $engine: 'yandex' | 'google' }>`
  padding: 0.85rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: #fff;
  color: #333;
  font-family: Arial, sans-serif;
  margin-top: 0.5rem;

  .url { font-size: 13px; color: ${({ $engine }) => ($engine === 'yandex' ? '#006000' : '#202124')}; margin-bottom: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .title {
    font-size: ${({ $engine }) => ($engine === 'yandex' ? '18px' : '20px')};
    line-height: 1.3;
    color: ${({ $engine }) => ($engine === 'yandex' ? '#0000cc' : '#1a0dab')};
    display: -webkit-box;
    -webkit-line-clamp: ${({ $engine }) => ($engine === 'yandex' ? 2 : 1)};
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .desc { font-size: 14px; line-height: 1.45; color: #4d5156; margin-top: 3px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
`;

const Og = styled.div`
  margin-top: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  aspect-ratio: 1200 / 630;
  background: ${({ theme }) => theme.colors.background};

  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`;

const Hints = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 0.25rem;

  li {
    display: flex;
    gap: 0.45rem;
    font-size: 0.8125rem;
    line-height: 1.45;

    svg { flex-shrink: 0; margin-top: 1px; }
    &.warn svg { color: ${({ theme }) => theme.colors.warning}; }
    &.ok svg { color: ${({ theme }) => theme.colors.success}; }
  }
`;

const Block = styled.div`
  & + & { margin-top: ${({ theme }) => theme.spacing.lg}; }
`;

function imagesWithoutAlt(sections: Section[], cover: MediaRef | null): number {
  let missing = cover && !cover.alt.trim() ? 1 : 0;
  for (const s of sections) {
    const images: (MediaRef | null | undefined)[] =
      s.type === 'image' || s.type === 'textImage' || s.type === 'hero' ? [s.image]
        : s.type === 'gallery' || s.type === 'imageGrid' ? s.items.map((i) => i.image) : [];
    missing += images.filter((img) => img && !img.alt.trim()).length;
  }
  return missing;
}

function h2Count(sections: Section[]): number {
  return sections.reduce((n, s) => (s.type === 'text' || s.type === 'textImage'
    ? n + s.doc.content.filter((node) => node.type === 'heading' && node.attrs?.level === 2 && nodeText(node).trim()).length
    : n), 0);
}

interface Props {
  title: string;
  excerpt: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  accentColor: string | null;
  coverImage: MediaRef | null;
  sections: Section[];
  onChange: (patch: { seoTitle?: string; seoDescription?: string }) => void;
  errors: Record<string, string>;
}

export default function SeoPanel(props: Props) {
  const { title, excerpt, slug, seoTitle, seoDescription, accentColor, coverImage, sections, onChange, errors } = props;
  const [engine, setEngine] = useState<'yandex' | 'google'>('yandex');
  const effectiveTitle = seoTitle || title;
  const effectiveDesc = seoDescription || excerpt;
  const ogTitle = useDeferredValue(title);

  const words = wordCount(sections);
  const links = collectLinks(sections);
  const internal = links.filter(isInternalHref).length;
  const h2 = h2Count(sections);
  const noAlt = imagesWithoutAlt(sections, coverImage);
  const hasCta = sections.some((s) => s.type === 'cta');

  const hints: { ok: boolean; text: string }[] = [
    { ok: effectiveTitle.length >= 20 && effectiveTitle.length <= 60, text: `SEO-заголовок ${effectiveTitle.length} симв. — оптимально 20–60` },
    { ok: effectiveDesc.length >= 70 && effectiveDesc.length <= 160, text: `Описание ${effectiveDesc.length} симв. — оптимально 70–160` },
    { ok: h2 > 0, text: h2 > 0 ? `Подзаголовков H2: ${h2}` : 'Нет ни одного подзаголовка H2 — добавьте структуру' },
    { ok: noAlt === 0, text: noAlt === 0 ? 'У всех изображений есть alt' : `Изображений без alt: ${noAlt}` },
    { ok: words >= 300, text: words >= 300 ? `Объём текста: ${words} слов` : `Текст короткий: ${words} слов (желательно от 300)` },
    { ok: internal > 0, text: internal > 0 ? `Внутренних ссылок: ${internal}` : 'Нет внутренних ссылок на услуги, цены или контакты' },
    { ok: Boolean(coverImage), text: coverImage ? 'Обложка задана' : 'Нет обложки — карточка в сетке будет пустой' },
    { ok: hasCta, text: hasCta ? 'Есть CTA-блок' : 'Нет CTA-блока — добавьте призыв вызвать специалиста' },
    { ok: slug.length <= 60, text: `Адрес: ${slug.length} симв.${slug.length > 60 ? ' — лучше короче' : ''}` },
  ];

  const url = `${SITE_URL.replace(/^https?:\/\//, '')} › news › ${slug}`;
  const ogSrc = `/api/admin/og?title=${encodeURIComponent(ogTitle)}${accentColor ? `&accent=${encodeURIComponent(accentColor)}` : ''}`;

  return (
    <Panel>
      <PanelTitle>SEO</PanelTitle>
      <Block>
        <Field label='SEO-заголовок (title)' hint='Если пусто — используется заголовок статьи' counter={{ length: effectiveTitle.length, min: 20, max: 60 }} error={errors.seoTitle}>
          <Input value={seoTitle} placeholder={title} onChange={(e) => onChange({ seoTitle: e.target.value })}/>
        </Field>
        <Field label='SEO-описание (description)' hint='Если пусто — используется анонс' counter={{ length: effectiveDesc.length, min: 70, max: 160 }} error={errors.seoDescription}>
          <Textarea rows={3} value={seoDescription} placeholder={excerpt} onChange={(e) => onChange({ seoDescription: e.target.value })}/>
        </Field>
      </Block>

      <Block>
        <Segmented label='Поисковик' value={engine} onChange={setEngine} options={[{ value: 'yandex', label: 'Яндекс' }, { value: 'google', label: 'Google' }]}/>
        <Snippet $engine={engine} aria-label='Превью сниппета'>
          <div className='url'>{url}</div>
          <div className='title'>{effectiveTitle} | НПП «Биохиммаш»</div>
          <div className='desc'>{effectiveDesc || 'Описание не заполнено — поисковик возьмёт случайный фрагмент текста.'}</div>
        </Snippet>
      </Block>

      <Block>
        <Muted>OG-картинка для соцсетей и мессенджеров (генерируется автоматически)</Muted>
        <Og>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ogSrc} alt='Превью OG-картинки' loading='lazy'/>
        </Og>
      </Block>

      <Block>
        <Muted>Подсказки</Muted>
        <Hints>
          {hints.map((h) => (
            <li key={h.text} className={h.ok ? 'ok' : 'warn'}>
              {h.ok ? <CheckCircle2 size={15}/> : <AlertTriangle size={15}/>}
              {h.text}
            </li>
          ))}
        </Hints>
      </Block>
    </Panel>
  );
}
