import { notFound } from 'next/navigation';
import ArticleEditor from '@/components/admin/editor/ArticleEditor';
import { adminGetArticle } from '@/lib/news/repo';

type Props = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();
  const article = await adminGetArticle(Number(id));
  if (!article) notFound();
  return <ArticleEditor key={article.id} initial={article}/>;
}
