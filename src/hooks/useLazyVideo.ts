import { useEffect, useRef } from 'react';

export function useLazyVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { rootMargin: '120px' });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return ref;
}
