'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { reachGoal } from '@/lib/metrika';

// Цели: клик по телефону/email/Telegram, переходы из статьи (data-goal),
// отправка форм с атрибутом data-goal
function useGoalTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a');
      if (!link) return;
      const href = link.getAttribute('href') ?? '';
      if (href.startsWith('tel:')) reachGoal('phone_click');
      else if (href.startsWith('mailto:')) reachGoal('email_click');
      else if (href.includes('t.me/')) reachGoal('telegram_click');
      const goal = link.getAttribute('data-goal');
      if (goal) reachGoal(goal);
    };
    const onSubmit = (e: SubmitEvent) => {
      const goal = (e.target as HTMLFormElement | null)?.getAttribute('data-goal');
      if (goal) reachGoal(goal);
    };
    document.addEventListener('click', onClick, { capture: true });
    document.addEventListener('submit', onSubmit, { capture: true });
    return () => {
      document.removeEventListener('click', onClick, { capture: true });
      document.removeEventListener('submit', onSubmit, { capture: true });
    };
  }, []);
}

export default function YandexMetrika() {
  useGoalTracking();

  return (
    <>
      <Script id="yandex-metrika" strategy="lazyOnload">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106199264', 'ym');

          ym(106199264, 'init', {
            ssr: true,
            webvisor: true,
            clickmap: true,
            ecommerce: "dataLayer",
            accurateTrackBounce: true,
            trackLinks: true
          });
        `}
      </Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://mc.yandex.ru/watch/106199264"
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
