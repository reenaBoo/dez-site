'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Copy, Eye, EyeOff, ExternalLink, Pencil, Pin, Plus, Search, Trash2 } from 'lucide-react';
import {
  createArticleAction, deleteArticleAction, duplicateArticleAction, setStatusAction,
} from '@/app/admin/actions';
import type { AdminListItem } from '@/lib/news/repo';
import { CARD_SIZE_LABELS } from '@/lib/news/types';
import { formatShortDate } from '@/lib/news/format';
import { Badge, Button, IconButton, Input, Muted, Row, Segmented } from './ui';

const Head = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  h1 { font-size: 1.6rem; }
`;

const Filters = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  .search {
    position: relative;
    flex: 1;
    min-width: 220px;
    max-width: 420px;

    svg { position: absolute; left: 0.7rem; top: 50%; transform: translateY(-50%); color: ${({ theme }) => theme.colors.textLight}; }
    input { padding-left: 2.2rem; }
  }
`;

const Table = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr) 150px 120px auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 0.75rem ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.navy};

  & + & { border-top: 1px solid ${({ theme }) => theme.colors.border}; }
  &:hover { background: #16161B; }

  .thumb {
    width: 88px;
    height: 56px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow: hidden;
    background: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};

    img { width: 100%; height: 100%; object-fit: cover; }
  }

  .title {
    min-width: 0;

    a { font-weight: 700; color: ${({ theme }) => theme.colors.heading}; &:hover { color: ${({ theme }) => theme.colors.primary}; } }
    div { margin-top: 0.15rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  }

  @media (max-width: 900px) {
    grid-template-columns: 64px minmax(0, 1fr);

    .thumb { width: 64px; height: 44px; }
    .status, .date, .actions { grid-column: 2; }
  }
`;

const Confirm = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.error};
`;

function statusOf(item: AdminListItem): { tone: 'draft' | 'published' | 'scheduled'; label: string } {
  if (item.status === 'draft') return { tone: 'draft', label: 'Черновик' };
  if (item.publishedAt && new Date(item.publishedAt).getTime() > Date.now()) return { tone: 'scheduled', label: 'Запланирована' };
  return { tone: 'published', label: 'Опубликована' };
}

interface Props {
  items: AdminListItem[];
  q: string;
  status: string;
}

export default function ArticleList({ items, q, status }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [query, setQuery] = useState(q);

  const applyFilter = (next: { q?: string; status?: string }) => {
    const params = new URLSearchParams();
    const nq = next.q ?? query;
    const ns = next.status ?? status;
    if (nq) params.set('q', nq);
    if (ns && ns !== 'all') params.set('status', ns);
    router.push(`/admin${params.size ? `?${params}` : ''}`);
  };

  const run = (fn: () => Promise<unknown>) => startTransition(async () => {
    await fn();
    setConfirmId(null);
    router.refresh();
  });

  return (
    <>
      <Head>
        <h1>Статьи</h1>
        <form action={createArticleAction}>
          <Button $variant='primary' type='submit'><Plus size={16}/> Новая статья</Button>
        </form>
      </Head>

      <Filters onSubmit={(e) => { e.preventDefault(); applyFilter({ q: query }); }}>
        <div className='search'>
          <Search size={16}/>
          <Input type='search' placeholder='Поиск по заголовку или адресу' value={query} onChange={(e) => setQuery(e.target.value)} aria-label='Поиск'/>
        </div>
        <Segmented
          label='Статус'
          value={status}
          onChange={(value) => applyFilter({ status: value })}
          options={[
            { value: 'all', label: 'Все' },
            { value: 'published', label: 'Опубликованные' },
            { value: 'scheduled', label: 'Запланированные' },
            { value: 'draft', label: 'Черновики' },
          ]}
        />
        <Muted>{items.length} шт.</Muted>
      </Filters>

      {items.length === 0 ? (
        <Muted>Ничего не найдено.</Muted>
      ) : (
        <Table aria-busy={pending}>
          {items.map((item) => {
            const st = statusOf(item);
            const thumb = item.coverImage?.variants?.[0]?.url ?? item.coverImage?.url;
            return (
              <Item key={item.id}>
                <div className='thumb'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {thumb && <img src={thumb} alt=''/>}
                </div>
                <div className='title'>
                  <Link href={`/admin/articles/${item.id}`}>{item.title}</Link>
                  <div><Muted>/news/{item.slug} · {CARD_SIZE_LABELS[item.cardSize]}{item.isFeatured && ' · закреплена'}</Muted></div>
                </div>
                <div className='status'>
                  <Badge $tone={st.tone}>{item.isFeatured && <Pin size={11}/>}{st.label}</Badge>
                </div>
                <div className='date'>
                  <Muted>{item.publishedAt ? formatShortDate(item.publishedAt) : `изм. ${formatShortDate(item.updatedAt)}`}</Muted>
                </div>
                <Row className='actions' $justify='flex-end'>
                  {confirmId === item.id ? (
                    <Confirm>
                      Удалить навсегда?
                      <Button $variant='danger' $size='sm' type='button' onClick={() => run(() => deleteArticleAction(item.id))}>Да</Button>
                      <Button $size='sm' type='button' onClick={() => setConfirmId(null)}>Нет</Button>
                    </Confirm>
                  ) : (
                    <>
                      <IconButton as={Link} href={`/admin/articles/${item.id}`} title='Редактировать' aria-label='Редактировать'><Pencil size={16}/></IconButton>
                      {item.status === 'published' ? (
                        <IconButton type='button' title='Снять с публикации' aria-label='Снять с публикации' onClick={() => run(() => setStatusAction(item.id, 'draft'))}><EyeOff size={16}/></IconButton>
                      ) : (
                        <IconButton type='button' title='Опубликовать' aria-label='Опубликовать' onClick={() => run(() => setStatusAction(item.id, 'published'))}><Eye size={16}/></IconButton>
                      )}
                      <IconButton type='button' title='Дублировать' aria-label='Дублировать' onClick={() => run(() => duplicateArticleAction(item.id))}><Copy size={16}/></IconButton>
                      <IconButton as='a' href={item.status === 'published' ? `/news/${item.slug}` : `/admin/preview/${item.id}`} target='_blank' title='Открыть' aria-label='Открыть'><ExternalLink size={16}/></IconButton>
                      <IconButton type='button' title='Удалить' aria-label='Удалить' onClick={() => setConfirmId(item.id)}><Trash2 size={16}/></IconButton>
                    </>
                  )}
                </Row>
              </Item>
            );
          })}
        </Table>
      )}
    </>
  );
}
