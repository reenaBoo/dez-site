'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
    max-width: 100vw;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
    max-width: 100vw;
    position: relative;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.heading};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  ul {
    list-style: none;
  }

  ::selection {
    background: rgba(217, 177, 95, 0.85);
    color: #0A0A0C;
  }

  ::-webkit-scrollbar {
    width: 10px;
    background: ${({ theme }) => theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.navyLight};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  /* ─── View Transitions: «проваливание» карточки в статью ─────────────── */

  ::view-transition {
    pointer-events: none;
  }

  /* Обложка карточки перетекает в hero статьи */
  ::view-transition-group(.news-morph) {
    animation-duration: 620ms;
    animation-timing-function: cubic-bezier(0.65, 0, 0.2, 1);
    z-index: 60;
  }

  ::view-transition-old(.news-morph),
  ::view-transition-new(.news-morph) {
    height: 100%;
    width: 100%;
    object-fit: cover;
    overflow: clip;
  }

  ::view-transition-image-pair(.news-morph) {
    animation-name: news-via-blur;
    animation-duration: 620ms;
  }

  ::view-transition-group(.news-morph-title) {
    animation-duration: 560ms;
    animation-timing-function: cubic-bezier(0.65, 0, 0.2, 1);
    z-index: 61;
  }

  /* Сетка уходит назад и гаснет, статья проявляется после морфа */
  ::view-transition-old(.news-grid-exit) {
    animation: news-recede 360ms cubic-bezier(0.4, 0, 1, 1) both;
  }

  ::view-transition-new(.news-grid-enter) {
    animation: news-fade-in 420ms ease-out 180ms both;
  }

  ::view-transition-new(.news-article-enter) {
    animation: news-rise 520ms cubic-bezier(0.22, 1, 0.36, 1) 220ms both;
  }

  ::view-transition-old(.news-article-exit) {
    animation: news-fade-out 260ms ease-in both;
  }

  @keyframes news-via-blur {
    40% { filter: blur(4px) brightness(1.08); }
  }

  @keyframes news-recede {
    to { opacity: 0; transform: scale(0.96); filter: blur(2px); }
  }

  @keyframes news-rise {
    from { opacity: 0; transform: translateY(28px); }
  }

  @keyframes news-fade-in {
    from { opacity: 0; }
  }

  @keyframes news-fade-out {
    to { opacity: 0; }
  }

  /* Шапка сайта не участвует в переходе (только верхний header, не hero статьи) */
  body > header {
    view-transition-name: site-header;
  }

  ::view-transition-group(site-header) {
    animation: none;
    z-index: 100;
  }

  ::view-transition-old(site-header) {
    display: none;
  }

  ::view-transition-new(site-header) {
    animation: none;
  }

  @media (prefers-reduced-motion: reduce) {
    /* Вместо морфа — простое затухание */
    ::view-transition-group(*) {
      animation-duration: 0s !important;
    }

    ::view-transition-old(*) {
      animation: news-fade-out 180ms ease both !important;
    }

    ::view-transition-new(*) {
      animation: news-fade-in 180ms ease both !important;
    }

    *, *::before, *::after {
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
