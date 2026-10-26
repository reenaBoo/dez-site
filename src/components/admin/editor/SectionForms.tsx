'use client';

import styled from 'styled-components';
import { Plus, Trash2 } from 'lucide-react';
import type { Section, SectionSettings } from '@/lib/news/types';
import { newId } from '@/lib/news/sections';
import { parseVideoUrl, VIDEO_PROVIDER_LABEL } from '@/lib/news/video';
import { Button, Field, IconButton, Input, Muted, Row, Segmented, Select, Textarea, Toggle } from '../ui';
import ImageField from './ImageField';
import ImageListField from './ImageListField';
import RichTextEditor, { INTERNAL_PAGES } from './RichTextEditor';

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;

const Inline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  > span { font-size: 0.8125rem; font-weight: 600; }
`;

const FaqItemBox = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.4rem;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};

  input, textarea { grid-column: 1; }
  button { grid-column: 2; grid-row: 1; align-self: start; }
`;

function Choice<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <Inline>
      <span>{label}</span>
      <Segmented label={label} value={value} options={options} onChange={onChange}/>
    </Inline>
  );
}

// Общие настройки любой секции
export function SettingsForm({ value, onChange }: { value: SectionSettings; onChange: (v: SectionSettings) => void }) {
  return (
    <Row $wrap $gap='1.25rem'>
      <Choice label='Фон' value={value.background} onChange={(background) => onChange({ ...value, background })}
        options={[{ value: 'none', label: 'Нет' }, { value: 'alt', label: 'Тёмный' }, { value: 'card', label: 'Карточка' }, { value: 'gold', label: 'Золото' }]}/>
      <Choice label='Отступы' value={value.spacing} onChange={(spacing) => onChange({ ...value, spacing })}
        options={[{ value: 's', label: 'S' }, { value: 'm', label: 'M' }, { value: 'l', label: 'L' }]}/>
      <Choice label='Появление' value={value.animation} onChange={(animation) => onChange({ ...value, animation })}
        options={[{ value: 'none', label: 'Нет' }, { value: 'fade', label: 'Fade' }, { value: 'slide', label: 'Slide' }, { value: 'reveal', label: 'Reveal' }]}/>
    </Row>
  );
}

interface FormProps {
  section: Section;
  onChange: (section: Section) => void;
}

// Поля конкретного типа секции
export function SectionFields({ section, onChange }: FormProps) {
  const set = <S extends Section>(patch: Partial<S>) => onChange({ ...section, ...patch } as Section);

  switch (section.type) {
    case 'hero':
      return (
        <Stack>
          <Choice label='Вариант' value={section.variant} onChange={(variant) => set({ variant })}
            options={[{ value: 'fullscreen', label: 'На весь экран' }, { value: 'title-image', label: 'Заголовок + фото' }, { value: 'split', label: 'Разделённый' }]}/>
          <Field label='Подзаголовок' hint='Заголовок статьи берётся из основных полей'>
            <Textarea rows={2} value={section.subtitle ?? ''} onChange={(e) => set({ subtitle: e.target.value })}/>
          </Field>
          <ImageField label='Изображение (если пусто — обложка статьи)' value={section.image} onChange={(image) => set({ image })}/>
        </Stack>
      );

    case 'text':
      return (
        <Stack>
          <Choice label='Ширина' value={section.width} onChange={(width) => set({ width })}
            options={[{ value: 'narrow', label: 'Узкая' }, { value: 'wide', label: 'Широкая' }]}/>
          <RichTextEditor value={section.doc} onChange={(doc) => set({ doc })}/>
        </Stack>
      );

    case 'image':
      return (
        <Stack>
          <Choice label='Ширина' value={section.layout} onChange={(layout) => set({ layout })}
            options={[{ value: 'column', label: 'В колонку' }, { value: 'wide', label: 'Широкое' }, { value: 'full', label: 'На весь экран' }]}/>
          <ImageField value={section.image} onChange={(image) => set({ image })}/>
          <Field label='Подпись'>
            <Input value={section.caption ?? ''} onChange={(e) => set({ caption: e.target.value })}/>
          </Field>
        </Stack>
      );

    case 'gallery':
      return <ImageListField items={section.items} onChange={(items) => set({ items })}/>;

    case 'imageGrid':
      return (
        <Stack>
          <Choice label='Раскладка' value={section.layout} onChange={(layout) => set({ layout })}
            options={[{ value: 'equal', label: 'Ровная' }, { value: 'feature-left', label: 'Крупное слева' }, { value: 'feature-right', label: 'Крупное справа' }, { value: 'mosaic', label: 'Мозаика' }]}/>
          <ImageListField items={section.items} onChange={(items) => set({ items })} max={4}/>
        </Stack>
      );

    case 'textImage':
      return (
        <Stack>
          <Row $wrap $gap='1.25rem'>
            <Choice label='Фото' value={section.imageSide} onChange={(imageSide) => set({ imageSide })}
              options={[{ value: 'left', label: 'Слева' }, { value: 'right', label: 'Справа' }]}/>
            <div style={{ minWidth: 260 }}>
              <Toggle label='Закрепить фото при прокрутке (sticky)' checked={section.sticky} onChange={(sticky) => set({ sticky })}/>
            </div>
          </Row>
          <Grid2>
            <RichTextEditor value={section.doc} onChange={(doc) => set({ doc })}/>
            <ImageField value={section.image} onChange={(image) => set({ image })}/>
          </Grid2>
        </Stack>
      );

    case 'quote':
      return (
        <Stack>
          <Field label='Текст цитаты'>
            <Textarea rows={3} value={section.text} onChange={(e) => set({ text: e.target.value })}/>
          </Field>
          <Field label='Автор / источник'>
            <Input value={section.author ?? ''} onChange={(e) => set({ author: e.target.value })}/>
          </Field>
        </Stack>
      );

    case 'fact':
      return (
        <Stack>
          <Grid2>
            <Field label='Число'>
              <Input type='number' value={Number.isFinite(section.value) ? section.value : 0} onChange={(e) => set({ value: Number(e.target.value) })}/>
            </Field>
            <Field label='Знаков после запятой'>
              <Select value={section.decimals} onChange={(e) => set({ decimals: Number(e.target.value) })}>
                {[0, 1, 2].map((d) => <option key={d} value={d}>{d}</option>)}
              </Select>
            </Field>
            <Field label='Перед числом' hint='Например «>» или «до»'>
              <Input value={section.prefix ?? ''} onChange={(e) => set({ prefix: e.target.value })}/>
            </Field>
            <Field label='После числа' hint='Например «%», « лет», « га»'>
              <Input value={section.suffix ?? ''} onChange={(e) => set({ suffix: e.target.value })}/>
            </Field>
          </Grid2>
          <Field label='Подпись'>
            <Textarea rows={2} value={section.label} onChange={(e) => set({ label: e.target.value })}/>
          </Field>
        </Stack>
      );

    case 'video': {
      const embed = section.url ? parseVideoUrl(section.url) : null;
      return (
        <Stack>
          <Field
            label='Ссылка на видео'
            error={section.url && !embed ? 'Поддерживаются YouTube, VK Видео и RuTube' : undefined}
            hint={embed ? `Распознано: ${VIDEO_PROVIDER_LABEL[embed.provider]}` : 'YouTube, VK Видео или RuTube'}
          >
            <Input value={section.url} onChange={(e) => set({ url: e.target.value })} placeholder='https://rutube.ru/video/…' aria-invalid={Boolean(section.url && !embed)}/>
          </Field>
          <Field label='Название / подпись'>
            <Input value={section.title ?? ''} onChange={(e) => set({ title: e.target.value })}/>
          </Field>
          <ImageField label='Превью (необязательно — у YouTube берётся автоматически)' value={section.poster} onChange={(poster) => set({ poster })} compact/>
        </Stack>
      );
    }

    case 'cta':
      return (
        <Stack>
          <Field label='Заголовок'>
            <Input value={section.title} onChange={(e) => set({ title: e.target.value })}/>
          </Field>
          <Field label='Текст'>
            <Textarea rows={2} value={section.text} onChange={(e) => set({ text: e.target.value })}/>
          </Field>
          <Grid2>
            <Field label='Текст кнопки'>
              <Input value={section.buttonLabel} onChange={(e) => set({ buttonLabel: e.target.value })}/>
            </Field>
            <Field label='Куда ведёт кнопка'>
              <Select value={INTERNAL_PAGES.some((p) => p.href === section.buttonHref) ? section.buttonHref : ''} onChange={(e) => e.target.value && set({ buttonHref: e.target.value })}>
                <option value=''>Своя ссылка…</option>
                {INTERNAL_PAGES.map((p) => <option key={p.href} value={p.href}>{p.label}</option>)}
              </Select>
            </Field>
          </Grid2>
          <Field label='Ссылка кнопки'>
            <Input value={section.buttonHref} onChange={(e) => set({ buttonHref: e.target.value })}/>
          </Field>
          <Toggle label='Показывать телефон и часы работы' checked={section.showPhone} onChange={(showPhone) => set({ showPhone })}/>
        </Stack>
      );

    case 'faq':
      return (
        <Stack>
          <Field label='Заголовок блока'>
            <Input value={section.title ?? ''} onChange={(e) => set({ title: e.target.value })}/>
          </Field>
          {section.items.map((item, index) => (
            <FaqItemBox key={item.id}>
              <Input placeholder='Вопрос' value={item.question} onChange={(e) => set({ items: section.items.map((it, k) => (k === index ? { ...it, question: e.target.value } : it)) })}/>
              <Textarea rows={2} placeholder='Ответ' value={item.answer} onChange={(e) => set({ items: section.items.map((it, k) => (k === index ? { ...it, answer: e.target.value } : it)) })}/>
              <IconButton type='button' aria-label='Удалить вопрос' onClick={() => set({ items: section.items.filter((_, k) => k !== index) })}><Trash2 size={15}/></IconButton>
            </FaqItemBox>
          ))}
          <Row>
            <Button type='button' $size='sm' onClick={() => set({ items: [...section.items, { id: newId(), question: '', answer: '' }] })}>
              <Plus size={14}/> Добавить вопрос
            </Button>
            <Muted>Блок автоматически размечается как FAQPage для поисковиков</Muted>
          </Row>
        </Stack>
      );

    case 'divider':
      return (
        <Choice label='Вид' value={section.style} onChange={(style) => set({ style })}
          options={[{ value: 'line', label: 'Линия' }, { value: 'ornament', label: 'Орнамент' }, { value: 'space', label: 'Отступ' }]}/>
      );
  }
}

// Короткое описание секции для свёрнутого состояния
export function sectionSummary(section: Section): string {
  switch (section.type) {
    case 'hero': return { fullscreen: 'На весь экран', 'title-image': 'Заголовок + фото', split: 'Разделённый' }[section.variant];
    case 'text':
    case 'textImage': {
      const first = section.doc.content.find((n) => n.content?.length);
      const text = first?.content?.map((c) => c.text ?? '').join('') ?? '';
      return text.slice(0, 80) || 'Пустой текст';
    }
    case 'image': return section.image ? (section.caption || section.image.alt || 'Изображение') : 'Нет изображения';
    case 'gallery':
    case 'imageGrid': return `${section.items.length} фото`;
    case 'quote': return section.text.slice(0, 80) || 'Пустая цитата';
    case 'fact': return `${section.prefix ?? ''}${section.value}${section.suffix ?? ''} — ${section.label}`.slice(0, 80);
    case 'video': return section.url || 'Ссылка не указана';
    case 'cta': return section.title;
    case 'faq': return `${section.items.length} вопросов`;
    case 'divider': return { line: 'Линия', ornament: 'Орнамент', space: 'Отступ' }[section.style];
  }
}
