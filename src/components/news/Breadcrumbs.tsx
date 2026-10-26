'use client';

import Link from 'next/link';
import styled from 'styled-components';
import type { Crumb } from '@/lib/seo/jsonld';

const Nav = styled.nav`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6875rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLight};
`;

const List = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6em;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 0.6em;
    min-width: 0;
  }

  li + li::before {
    content: '/';
    color: rgba(217, 177, 95, 0.55);
  }

  a {
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover, &:focus-visible {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  [aria-current] {
    color: ${({ theme }) => theme.colors.text};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: min(60vw, 420px);
  }
`;

export default function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <Nav aria-label='Хлебные крошки' className={className}>
      <List>
        {items.map((item, i) => (
          <li key={item.path}>
            {i === items.length - 1
              ? <span aria-current='page'>{item.name}</span>
              : <Link href={item.path}>{item.name}</Link>}
          </li>
        ))}
      </List>
    </Nav>
  );
}
