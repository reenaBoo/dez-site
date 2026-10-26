import type { CSSProperties } from 'react';
import type { MediaRef } from '@/lib/news/types';

interface MediaImageProps {
  media: MediaRef;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  alt?: string;
}

// Изображения из админки уже нарезаны sharp'ом в WebP нескольких ширин — отдаём их через srcset
// без повторной обработки оптимизатором Next. width/height заданы — нет CLS.
export default function MediaImage({ media, sizes, priority, className, style, alt }: MediaImageProps) {
  const srcSet = media.variants?.length
    ? media.variants.map((v) => `${v.url} ${v.width}w`).join(', ')
    : undefined;
  const fallback = media.variants?.find((v) => v.width >= 960)?.url ?? media.url;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={fallback}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={media.width}
      height={media.height}
      alt={alt ?? media.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      className={className}
      style={style}
    />
  );
}
