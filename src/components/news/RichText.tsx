'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import type { RichDoc, RichNode } from '@/lib/news/types';
import { headingAnchor, isInternalHref, nodeText, safeHref } from '@/lib/news/content';

export const Prose = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.125rem;
  line-height: 1.8;

  > * + * {
    margin-top: 1.1em;
  }

  h2 {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: ${({ theme }) => theme.fontWeight.extrabold};
    margin-top: 1.8em;
    scroll-margin-top: 110px;
  }

  h3 {
    font-size: clamp(1.25rem, 2.2vw, 1.5rem);
    margin-top: 1.5em;
    scroll-margin-top: 110px;
  }

  > h2:first-child, > h3:first-child {
    margin-top: 0;
  }

  strong {
    color: ${({ theme }) => theme.colors.heading};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  a {
    color: var(--accent, ${({ theme }) => theme.colors.primary});
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryLight};
    }
  }

  ul, ol {
    padding-left: 1.4em;
    display: flex;
    flex-direction: column;
    gap: 0.45em;
  }

  ul {
    list-style: none;
    padding-left: 0;

    li {
      position: relative;
      padding-left: 1.6em;

      &::before {
        content: '—';
        position: absolute;
        left: 0;
        color: var(--accent, ${({ theme }) => theme.colors.primary});
      }
    }
  }

  ol {
    list-style: decimal;

    li::marker {
      color: var(--accent, ${({ theme }) => theme.colors.primary});
      font-family: ${({ theme }) => theme.fonts.mono};
    }
  }

  li > p + p {
    margin-top: 0.4em;
  }

  blockquote {
    border-left: 2px solid var(--accent, ${({ theme }) => theme.colors.primary});
    padding-left: 1.2em;
    color: ${({ theme }) => theme.colors.heading};
    font-style: italic;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.0625rem;
  }
`;

interface RenderContext {
  // Сквозной счётчик H2 по всей статье — для якорей оглавления
  h2Index: { current: number };
}

function renderText(node: RichNode, key: number): ReactNode {
  let content: ReactNode = node.text;
  for (const mark of node.marks ?? []) {
    if (mark.type === 'bold') content = <strong>{content}</strong>;
    if (mark.type === 'italic') content = <em>{content}</em>;
    if (mark.type === 'link') {
      const href = safeHref(mark.attrs?.href);
      if (!href) continue;
      content = isInternalHref(href)
        ? <Link href={href} data-goal='article_internal_link'>{content}</Link>
        : <a href={href} target='_blank' rel='noopener noreferrer'>{content}</a>;
    }
  }
  return <span key={key}>{content}</span>;
}

function renderNode(node: RichNode, key: number, ctx: RenderContext): ReactNode {
  const children = () => (node.content ?? []).map((child, i) => renderNode(child, i, ctx));

  switch (node.type) {
    case 'text':
      return renderText(node, key);
    case 'hardBreak':
      return <br key={key}/>;
    case 'paragraph':
      return <p key={key}>{children()}</p>;
    case 'heading': {
      if (node.attrs?.level === 3) return <h3 key={key}>{children()}</h3>;
      const text = nodeText(node).trim();
      const id = text ? headingAnchor(text, ctx.h2Index.current++) : undefined;
      return <h2 key={key} id={id}>{children()}</h2>;
    }
    case 'bulletList':
      return <ul key={key}>{children()}</ul>;
    case 'orderedList':
      return <ol key={key} start={typeof node.attrs?.start === 'number' ? node.attrs.start : undefined}>{children()}</ol>;
    case 'listItem':
      return <li key={key}>{children()}</li>;
    case 'blockquote':
      return <blockquote key={key}>{children()}</blockquote>;
    default:
      // Неизвестные узлы не выводим — повторная защита после санитизации при сохранении
      return null;
  }
}

interface RichTextProps {
  doc: RichDoc;
  // С какого номера H2 начинать (сколько H2 было в предыдущих секциях)
  h2Offset?: number;
  className?: string;
}

export default function RichText({ doc, h2Offset = 0, className }: RichTextProps) {
  const ctx: RenderContext = { h2Index: { current: h2Offset } };
  const isEmpty = !doc.content.some((n) => nodeText(n).trim());
  if (isEmpty) return null;
  return <Prose className={className}>{doc.content.map((node, i) => renderNode(node, i, ctx))}</Prose>;
}
