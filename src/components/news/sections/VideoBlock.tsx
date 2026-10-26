'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Play } from 'lucide-react';
import MediaImage from '@/components/news/MediaImage';
import { Caption } from '@/components/news/ui';
import SectionShell from './SectionShell';
import { parseVideoUrl, VIDEO_PROVIDER_LABEL } from '@/lib/news/video';
import type { VideoSection } from '@/lib/news/types';

const Root = styled.figure`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const Frame = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background:
    radial-gradient(60% 80% at 50% 40%, rgba(217, 177, 95, 0.12), transparent 70%),
    ${({ theme }) => theme.colors.navy};

  iframe, img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    object-fit: cover;
  }
`;

const PlayButton = styled.button`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, rgba(10, 10, 12, 0.1), rgba(10, 10, 12, 0.55));
  color: ${({ theme }) => theme.colors.background};

  span.circle {
    display: grid;
    place-items: center;
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background: var(--accent, ${({ theme }) => theme.colors.primary});
    box-shadow: 0 0 0 10px rgba(217, 177, 95, 0.18), ${({ theme }) => theme.shadows.glow};
    transition: transform ${({ theme }) => theme.transitions.normal};
  }

  &:hover span.circle, &:focus-visible span.circle {
    transform: scale(1.08);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryLight};
    outline-offset: -4px;
  }

  span.provider {
    position: absolute;
    left: 1rem;
    bottom: 0.9rem;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.6875rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.heading};
  }
`;

// Превью вместо iframe до клика: сторонний плеер не грузится, пока его не попросили
export default function VideoBlock({ section }: { section: VideoSection }) {
  const [playing, setPlaying] = useState(false);
  const embed = parseVideoUrl(section.url);
  if (!embed) return null;

  const title = section.title || `Видео (${VIDEO_PROVIDER_LABEL[embed.provider]})`;

  return (
    <SectionShell settings={section.settings}>
      <Root>
        <Frame>
          {playing ? (
            <iframe
              src={embed.embedUrl}
              title={title}
              allow='autoplay; encrypted-media; fullscreen; picture-in-picture'
              allowFullScreen
              referrerPolicy='strict-origin-when-cross-origin'
            />
          ) : (
            <>
              {section.poster
                ? <MediaImage media={section.poster} sizes='(max-width: 1100px) 100vw, 1080px' alt=''/>
                // eslint-disable-next-line @next/next/no-img-element
                : embed.thumbnail && <img src={embed.thumbnail} alt='' loading='lazy' decoding='async'/>}
              <PlayButton type='button' onClick={() => setPlaying(true)} aria-label={`Смотреть: ${title}`}>
                <span className='circle'><Play size={32} fill='currentColor'/></span>
                <span className='provider'>{VIDEO_PROVIDER_LABEL[embed.provider]}</span>
              </PlayButton>
            </>
          )}
        </Frame>
        {section.title && <Caption>{section.title}</Caption>}
      </Root>
    </SectionShell>
  );
}
