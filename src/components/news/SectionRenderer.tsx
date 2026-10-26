'use client';

import type { Section } from '@/lib/news/types';
import { DividerBlock, ImageBlock, ImageGridBlock, QuoteBlock, TextBlock, TextImageBlock } from './sections/Blocks';
import GalleryBlock from './sections/GalleryBlock';
import FactBlock from './sections/FactBlock';
import VideoBlock from './sections/VideoBlock';
import CtaBlock from './sections/CtaBlock';
import FaqBlock from './sections/FaqBlock';

// Hero рендерится отдельно (ArticleHero) — здесь все остальные секции
export default function SectionRenderer({ section, h2Offset }: { section: Section; h2Offset: number }) {
  switch (section.type) {
    case 'text': return <TextBlock section={section} h2Offset={h2Offset}/>;
    case 'textImage': return <TextImageBlock section={section} h2Offset={h2Offset}/>;
    case 'image': return <ImageBlock section={section}/>;
    case 'gallery': return <GalleryBlock section={section}/>;
    case 'imageGrid': return <ImageGridBlock section={section}/>;
    case 'quote': return <QuoteBlock section={section}/>;
    case 'fact': return <FactBlock section={section}/>;
    case 'video': return <VideoBlock section={section}/>;
    case 'cta': return <CtaBlock section={section}/>;
    case 'faq': return <FaqBlock section={section}/>;
    case 'divider': return <DividerBlock section={section}/>;
    default: return null;
  }
}
