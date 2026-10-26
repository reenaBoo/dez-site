import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import ArticleView from '@/components/news/ArticleView';
import { getPublishedArticle, getPublishedSlugs, getRelatedCards, getSlugRedirect } from '@/lib/news/repo';
import { collectFaq, collectToc } from '@/lib/news/content';
import { pageMetadata } from '@/lib/seo/metadata';
import { JsonLd, breadcrumbLd, faqLd, newsArticleLd, type Crumb } from '@/lib/seo/jsonld';

// Статьи собираются при сборке и обновляются по revalidatePath из админки;
// раз в час — на случай отложенной публикации
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

function crumbsFor(title: string, slug: string): Crumb[] {
  return [
    { name: 'Главная', path: '/' },
    { name: 'Новости', path: '/news' },
    { name: title, path: `/news/${slug}` },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) return {};

  const path = `/news/${article.slug}`;
  const meta = pageMetadata({
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    path,
    image: article.ogImage || `${path}/opengraph-image`,
    type: 'article',
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: 'article',
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    const moved = await getSlugRedirect(slug);
    if (moved) permanentRedirect(`/news/${moved}`);
    notFound();
  }

  const related = await getRelatedCards(article);
  const crumbs = crumbsFor(article.title, article.slug);
  const faq = collectFaq(article.content);
  const path = `/news/${article.slug}`;

  const ld = [
    newsArticleLd({
      title: article.title,
      description: article.seoDescription || article.excerpt,
      path,
      image: article.ogImage || article.coverImage?.url || `${path}/opengraph-image`,
      publishedAt: article.publishedAt ?? article.createdAt,
      updatedAt: article.updatedAt,
    }),
    breadcrumbLd(crumbs),
    ...(faq.length ? [faqLd(faq)] : []),
  ];

  return (
    <>
      <JsonLd data={ld}/>
      <ArticleView article={article} related={related} crumbs={crumbs} toc={collectToc(article.content)}/>
    </>
  );
}
