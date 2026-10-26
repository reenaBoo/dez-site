import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Atmosphere from '@/components/Atmosphere';
import PreviewClient from '@/components/admin/PreviewClient';
import { requireAdmin } from '@/lib/auth/server';
import { adminGetArticle, getRelatedCards } from '@/lib/news/repo';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ id: string }> };

// Предпросмотр статьи ровно как на сайте — с шапкой, футером и анимациями
export default async function PreviewPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();
  const article = await adminGetArticle(Number(id));
  if (!article) notFound();
  const related = await getRelatedCards(article);

  return (
    <>
      <Header/>
      <main>
        <PreviewClient article={article} related={related}/>
      </main>
      <Footer/>
      <Atmosphere/>
    </>
  );
}
