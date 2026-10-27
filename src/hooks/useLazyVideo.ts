import { useEffect, useRef } from 'react';

export function useLazyVideo(src: string) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // На мобильных видео не грузим вовсе — экономим трафик и LCP.
    // «Уменьшить движение» не учитываем: в Windows он включается вместе с отключением анимаций системы
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!video.getAttribute('src')) {
          video.setAttribute('src', src);
        }
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { rootMargin: '200px' });

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return ref;
}
