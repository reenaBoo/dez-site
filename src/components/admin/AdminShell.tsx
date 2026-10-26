'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { ExternalLink, LogOut, Newspaper } from 'lucide-react';
import { logoutAction } from '@/app/admin/actions';
import { AdminPage, Button } from './ui';

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: 0.7rem ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(10, 10, 12, 0.9);
  backdrop-filter: blur(10px);
`;

const Brand = styled(Link)`
  font-weight: 800;
  white-space: nowrap;

  span { color: ${({ theme }) => theme.colors.primary}; }
  small {
    margin-left: 0.5rem;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.6875rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 0.25rem;
  flex: 1;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.7rem;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 0.875rem;

    &[aria-current='page'], &:hover { color: ${({ theme }) => theme.colors.heading}; background: ${({ theme }) => theme.colors.navyLight}; }
  }
`;

const Main = styled.main`
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 1480px;
  margin: 0 auto;
`;

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AdminPage>
      <Bar>
        <Brand href='/admin'>НПП <span>«Биохиммаш»</span><small>админка</small></Brand>
        <Nav>
          <Link href='/admin' aria-current={pathname === '/admin' || pathname.startsWith('/admin/articles') ? 'page' : undefined}>
            <Newspaper size={16}/> Статьи
          </Link>
          <Link href='/news' target='_blank'><ExternalLink size={16}/> На сайт</Link>
        </Nav>
        <form action={logoutAction}>
          <Button $variant='subtle' $size='sm' type='submit'><LogOut size={15}/> Выйти</Button>
        </form>
      </Bar>
      <Main>{children}</Main>
    </AdminPage>
  );
}
