'use client';

import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { ArrowLeft, Eye, RefreshCw, Rocket, Save, Undo2 } from 'lucide-react';
import { saveArticleAction, setStatusAction } from '@/app/admin/actions';
import type { Article, ArticleStatus, CardSize, MediaRef, Section, ServiceSlug } from '@/lib/news/types';
import { CARD_SIZES } from '@/lib/news/types';
import { slugify } from '@/lib/news/slug';
import { SERVICES } from '@/lib/site';
import NewsCard from '@/components/news/NewsCard';
import { Badge, Button, Field, Input, Muted, Panel, PanelTitle, Row, Segmented, Textarea, Toggle } from '../ui';
import ImageField from './ImageField';
import SectionList from './SectionList';
import SeoPanel from './SeoPanel';

// ─── Модель формы ───────────────────────────────────────────────────────

interface Draft {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: MediaRef | null;
  cardSize: CardSize;
  content: Section[];
  accentColor: string | null;
  showAtmosphere: boolean;
  publishedAt: string; // datetime-local, '' — не задано
  isFeatured: boolean;
  seoTitle: string;
  seoDescription: string;
  relatedServices: ServiceSlug[];
}

const pad = (n: number) => String(n).padStart(2, '0');
function toLocalInput(date: Date | null): string {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromArticle(a: Article): Draft {
  return {
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    coverImage: a.coverImage,
    cardSize: a.cardSize,
    content: a.content,
    accentColor: a.accentColor,
    showAtmosphere: a.showAtmosphere,
    publishedAt: toLocalInput(a.publishedAt),
    isFeatured: a.isFeatured,
    seoTitle: a.seoTitle ?? '',
    seoDescription: a.seoDescription ?? '',
    relatedServices: a.relatedServices,
  };
}

function toInput(d: Draft) {
  return { ...d, publishedAt: d.publishedAt ? new Date(d.publishedAt).toISOString() : null };
}

const BACKUP_KEY = (id: number) => `admin:backup:${id}`;
export const PREVIEW_KEY = (id: number) => `admin:preview:${id}`;

// ─── Разметка ───────────────────────────────────────────────────────────

const ActionBar = styled.div`
  position: sticky;
  top: 53px;
  z-index: 40;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin: -${({ theme }) => theme.spacing.lg} -${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
  padding: 0.6rem ${({ theme }) => theme.spacing.lg};
  background: rgba(13, 13, 16, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  .title { flex: 1; min-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 700; }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 390px;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: start;

  aside {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
    position: sticky;
    top: 118px;
    max-height: calc(100vh - 130px);
    overflow: auto;
    padding-bottom: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    aside { position: static; max-height: none; }
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const TitleInput = styled(Input)`
  font-size: 1.5rem;
  font-weight: 800;
  padding: 0.7rem 0.9rem;
`;

const SlugRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0.4rem;

  .prefix {
    display: flex;
    align-items: center;
    padding: 0 0.6rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    color: ${({ theme }) => theme.colors.textLight};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.8125rem;
  }
`;

const Banner = styled.div<{ $tone: 'error' | 'info' }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 0.7rem ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ $tone }) => ($tone === 'error' ? 'rgba(239,68,68,0.5)' : 'rgba(217,177,95,0.45)')};
  background: ${({ $tone }) => ($tone === 'error' ? 'rgba(239,68,68,0.08)' : 'rgba(217,177,95,0.06)')};
  color: ${({ $tone, theme }) => ($tone === 'error' ? theme.colors.error : theme.colors.heading)};
  font-size: 0.875rem;
`;

const CardStage = styled.div`
  margin-top: 0.5rem;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  overflow: hidden;

  .cell { pointer-events: none; }
`;

const Services = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; cursor: pointer; }
  input { accent-color: ${({ theme }) => theme.colors.primary}; }
`;

const ColorRow = styled(Row)`
  input[type='color'] {
    width: 44px;
    height: 34px;
    padding: 2px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: ${({ theme }) => theme.colors.background};
    cursor: pointer;
  }
`;

// Размеры ячеек сетки /news на десктопе — для честного превью карточки
const CELL: Record<CardSize, { w: number; h: number }> = {
  s: { w: 285, h: 392 }, m: { w: 285, h: 392 }, tall: { w: 285, h: 596 }, wide: { w: 586, h: 392 }, l: { w: 586, h: 596 },
};

type SaveState = 'saved' | 'dirty' | 'saving' | 'error';
type SavePhase = 'idle' | 'saving' | 'error';

export default function ArticleEditor({ initial }: { initial: Article }) {
  const [article, setArticle] = useState(initial);
  const [draft, setDraft] = useState<Draft>(() => fromArticle(initial));
  const [phase, setPhase] = useState<SavePhase>('idle');
  // Момент открытия редактора — для статуса «запланирована» (рендер должен быть чистым)
  const [openedAt] = useState(() => Date.now());
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [slugTouched, setSlugTouched] = useState(initial.status === 'published' || !initial.slug.startsWith('novaya-statya-'));
  const [backup, setBackup] = useState<Draft | null>(null);
  const [pending, startTransition] = useTransition();
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(fromArticle(initial)));

  const isPublished = article.status === 'published';
  const draftJson = useMemo(() => JSON.stringify(draft), [draft]);
  const dirty = draftJson !== savedJson;
  const saveState: SaveState = phase === 'saving' ? 'saving' : phase === 'error' ? 'error' : dirty ? 'dirty' : 'saved';

  const update = useCallback((patch: Partial<Draft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  // Заголовок → slug, пока slug не правили вручную и статья не опубликована
  const onTitle = (title: string) => update(slugTouched ? { title } : { title, slug: slugify(title) });

  // ── Сохранение ──
  const save = useCallback(async (status: ArticleStatus, opts: { silent?: boolean } = {}) => {
    setPhase('saving');
    if (!opts.silent) setError(null);
    const snapshot = draft;
    const result = await saveArticleAction(article.id, toInput(snapshot), status);
    if (result.ok) {
      // Дату публикации проставляет сервер — подтягиваем её в форму
      const synced = snapshot.publishedAt ? snapshot : { ...snapshot, publishedAt: toLocalInput(result.article.publishedAt) };
      if (synced !== snapshot) setDraft((prev) => (prev.publishedAt ? prev : { ...prev, publishedAt: synced.publishedAt }));
      setSavedJson(JSON.stringify(synced));
      setArticle(result.article);
      setFieldErrors({});
      setError(null);
      setPhase('idle');
      try { localStorage.removeItem(BACKUP_KEY(article.id)); } catch { /* недоступно */ }
      return true;
    }
    setPhase('error');
    setFieldErrors(result.fieldErrors ?? {});
    if (!opts.silent) setError(result.error);
    return false;
  }, [article.id, draft]);

  // ── Автосохранение: черновик — на сервер, опубликованная — локальная резервная копия ──
  useEffect(() => {
    if (!dirty) return;
    const timer = setTimeout(() => {
      try { localStorage.setItem(BACKUP_KEY(article.id), JSON.stringify({ at: Date.now(), draft })); } catch { /* недоступно */ }
      if (!isPublished) startTransition(() => { save('draft', { silent: true }); });
    }, 2500);
    return () => clearTimeout(timer);
  }, [draft, dirty, isPublished, article.id, save]);

  // Резервная копия новее сохранённой версии — предлагаем восстановить
  useEffect(() => {
    try {
      const raw = localStorage.getItem(BACKUP_KEY(initial.id));
      if (!raw) return;
      const parsed = JSON.parse(raw) as { at: number; draft: Draft };
      if (parsed.at > new Date(initial.updatedAt).getTime() && JSON.stringify(parsed.draft) !== JSON.stringify(fromArticle(initial))) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- однократное чтение localStorage после монтирования
        setBackup(parsed.draft);
      }
    } catch { /* недоступно */ }
  }, [initial]);

  // Предупреждение при уходе со страницы с несохранёнными изменениями
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  // Ctrl+S
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        startTransition(() => { save(isPublished ? 'published' : 'draft'); });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [save, isPublished]);

  const publish = () => startTransition(async () => { await save('published'); });
  const unpublish = () => startTransition(async () => {
    if (dirty && !(await save('published'))) return;
    const updated = await setStatusAction(article.id, 'draft');
    setArticle(updated);
  });

  const openPreview = () => {
    try { localStorage.setItem(PREVIEW_KEY(article.id), JSON.stringify(toInput(draft))); } catch { /* недоступно */ }
    window.open(`/admin/preview/${article.id}`, '_blank', 'noopener');
  };

  // Индексы секций с ошибками валидации (ключи вида content.3.image.alt)
  const errorIndexes = useMemo(() => new Set(
    Object.keys(fieldErrors).filter((k) => k.startsWith('content.')).map((k) => Number(k.split('.')[1])),
  ), [fieldErrors]);

  const scheduled = isPublished && article.publishedAt && new Date(article.publishedAt).getTime() > openedAt;
  const statusBadge = isPublished
    ? <Badge $tone={scheduled ? 'scheduled' : 'published'}>{scheduled ? 'Запланирована' : 'Опубликована'}</Badge>
    : <Badge $tone='draft'>Черновик</Badge>;

  const saveLabel: Record<SaveState, string> = {
    saved: isPublished ? 'Все изменения на сайте' : 'Черновик сохранён',
    dirty: isPublished ? 'Есть неопубликованные изменения' : 'Есть несохранённые изменения',
    saving: 'Сохраняем…',
    error: 'Ошибка сохранения',
  };

  const cell = CELL[draft.cardSize];
  const scale = Math.min(1, 340 / cell.w);

  return (
    <>
      <ActionBar>
        <Button as={Link} href='/admin' $variant='subtle' $size='sm'><ArrowLeft size={15}/> Статьи</Button>
        <span className='title'>{draft.title || 'Без заголовка'}</span>
        {statusBadge}
        <Muted aria-live='polite'>{saveLabel[saveState]}</Muted>
        <Button type='button' $size='sm' onClick={openPreview}><Eye size={15}/> Предпросмотр</Button>
        {isPublished ? (
          <>
            <Button type='button' $size='sm' onClick={unpublish} disabled={pending}><Undo2 size={15}/> Снять с публикации</Button>
            <Button type='button' $variant='primary' $size='sm' onClick={publish} disabled={pending || !dirty}><Save size={15}/> Обновить на сайте</Button>
          </>
        ) : (
          <>
            <Button type='button' $size='sm' onClick={() => startTransition(() => { save('draft'); })} disabled={pending}><Save size={15}/> Сохранить черновик</Button>
            <Button type='button' $variant='primary' $size='sm' onClick={publish} disabled={pending}><Rocket size={15}/> Опубликовать</Button>
          </>
        )}
      </ActionBar>

      <Layout>
        <Main>
          {error && <Banner $tone='error' role='alert'>{error}</Banner>}
          {backup && (
            <Banner $tone='info'>
              Найдены несохранённые изменения из прошлого сеанса.
              <Button type='button' $size='sm' $variant='primary' onClick={() => { setDraft(backup); setBackup(null); }}>Восстановить</Button>
              <Button type='button' $size='sm' onClick={() => { setBackup(null); try { localStorage.removeItem(BACKUP_KEY(article.id)); } catch { /* */ } }}>Отбросить</Button>
            </Banner>
          )}

          <Panel>
            <PanelTitle>Основное</PanelTitle>
            <Field label='Заголовок' error={fieldErrors.title} counter={{ length: draft.title.length, max: 120 }}>
              <TitleInput value={draft.title} onChange={(e) => onTitle(e.target.value)} aria-invalid={Boolean(fieldErrors.title)}/>
            </Field>
            <Field label='Адрес (slug)' error={fieldErrors.slug} hint={isPublished ? 'При смене адреса старый будет перенаправлять на новый (301)' : 'Формируется из заголовка, можно поправить'} as='div'>
              <SlugRow>
                <span className='prefix'>/news/</span>
                <Input value={draft.slug} onChange={(e) => { setSlugTouched(true); update({ slug: e.target.value.toLowerCase() }); }} aria-invalid={Boolean(fieldErrors.slug)}/>
                <Button type='button' $size='sm' title='Сформировать из заголовка' aria-label='Сформировать из заголовка' onClick={() => update({ slug: slugify(draft.title) })}><RefreshCw size={14}/></Button>
              </SlugRow>
            </Field>
            <Field label='Анонс' hint='Показывается в карточке, RSS и как описание по умолчанию' counter={{ length: draft.excerpt.length, min: 70, max: 300 }} error={fieldErrors.excerpt}>
              <Textarea rows={3} value={draft.excerpt} onChange={(e) => update({ excerpt: e.target.value })}/>
            </Field>
            <div style={{ marginTop: '1rem' }}>
              <ImageField label='Обложка (карточка в сетке и hero по умолчанию)' value={draft.coverImage} onChange={(coverImage) => update({ coverImage })} altError={fieldErrors['coverImage.alt']}/>
            </div>
          </Panel>

          <Panel>
            <PanelTitle>Конструктор статьи</PanelTitle>
            <SectionList sections={draft.content} onChange={(content) => update({ content })} errorIndexes={errorIndexes}/>
          </Panel>
        </Main>

        <aside>
          <Panel>
            <PanelTitle>Публикация</PanelTitle>
            <Field label='Дата публикации' hint='Дата в будущем — отложенная публикация'>
              <Input type='datetime-local' value={draft.publishedAt} onChange={(e) => update({ publishedAt: e.target.value })}/>
            </Field>
            <div style={{ marginTop: '1rem' }}>
              <Toggle label='Закрепить первой в сетке' checked={draft.isFeatured} onChange={(isFeatured) => update({ isFeatured })}/>
              <Toggle label='Атмосферный слой (туман, пыль)' checked={draft.showAtmosphere} onChange={(showAtmosphere) => update({ showAtmosphere })}/>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Field label='Акцентный цвет' as='div' hint='По умолчанию — золото сайта'>
                <ColorRow>
                  <input type='color' value={draft.accentColor ?? '#D9B15F'} onChange={(e) => update({ accentColor: e.target.value.toUpperCase() })} aria-label='Акцентный цвет'/>
                  <Muted>{draft.accentColor ?? 'золото темы'}</Muted>
                  {draft.accentColor && <Button type='button' $size='sm' $variant='subtle' onClick={() => update({ accentColor: null })}>Сбросить</Button>}
                </ColorRow>
              </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Field label='Связанные услуги' as='div' hint='Ссылки внизу статьи и подбор «Читайте также»'>
                <Services>
                  {SERVICES.map((s) => (
                    <label key={s.slug}>
                      <input
                        type='checkbox'
                        checked={draft.relatedServices.includes(s.slug)}
                        onChange={(e) => update({ relatedServices: e.target.checked ? [...draft.relatedServices, s.slug] : draft.relatedServices.filter((x) => x !== s.slug) })}
                      />
                      {s.name}
                    </label>
                  ))}
                </Services>
              </Field>
            </div>
          </Panel>

          <Panel>
            <PanelTitle>Карточка в сетке</PanelTitle>
            <Segmented
              label='Размер карточки'
              value={draft.cardSize}
              onChange={(cardSize) => update({ cardSize })}
              options={CARD_SIZES.map((s) => ({ value: s, label: s.toUpperCase() }))}
            />
            {draft.isFeatured && <div style={{ marginTop: '0.4rem' }}><Muted>Закреплённая статья на первой странице всегда показывается крупной (L)</Muted></div>}
            <CardStage>
              <div style={{ width: cell.w * scale, height: cell.h * scale }}>
                <div className='cell' style={{ width: cell.w, height: cell.h, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                  <NewsCard
                    card={{
                      id: article.id, title: draft.title, slug: `preview-${article.id}`, excerpt: draft.excerpt, coverImage: draft.coverImage,
                      cardSize: draft.cardSize, publishedAt: draft.publishedAt ? new Date(draft.publishedAt) : article.updatedAt,
                      isFeatured: draft.isFeatured, readingTime: article.readingTime, accentColor: draft.accentColor,
                    }}
                    size={draft.cardSize}
                    index={0}
                  />
                </div>
              </div>
            </CardStage>
          </Panel>

          <SeoPanel
            title={draft.title}
            excerpt={draft.excerpt}
            slug={draft.slug}
            seoTitle={draft.seoTitle}
            seoDescription={draft.seoDescription}
            accentColor={draft.accentColor}
            coverImage={draft.coverImage}
            sections={draft.content}
            onChange={update}
            errors={fieldErrors}
          />
        </aside>
      </Layout>
    </>
  );
}
