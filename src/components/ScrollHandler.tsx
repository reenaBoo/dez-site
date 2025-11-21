'use client';

import { useEffect } from 'react';

export default function ScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 100;
          const top = element.offsetTop - offset;
          window.scrollTo({
            top, behavior: 'smooth',
          });
        }
      }, 100);
    }
  }, []);

  return null;
}
