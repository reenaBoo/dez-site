import ArticleList from '@/components/admin/ArticleList';
import { adminListArticles } from '@/lib/news/repo';
import type { ArticleStatus } from '@/lib/news/types';

type Props = { searchParams: Promise<{ q?: string; status?: string }> };

const STATUSES = new Set(['draft', 'published', 'scheduled']);

export default async function AdminArticlesPage({ searchParams }: Props) {
  const { q, status } = await searchParams;
  const filter = {
    q: typeof q === 'string' ? q.slice(0, 100) : undefined,
    status: typeof status === 'string' && STATUSES.has(status) ? status as ArticleStatus | 'scheduled' : undefined,
  };
  const items = await adminListArticles(filter);
  return <ArticleList items={items} q={filter.q ?? ''} status={filter.status ?? 'all'}/>;
}
