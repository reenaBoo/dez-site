'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { Phone, Menu, X } from 'lucide-react';
import Container from './Container';

const HeaderWrapper = styled.header`
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    box-shadow: ${({ theme }) => theme.shadows.md};
    position: sticky;
    top: 0;
    z-index: 100;
    padding: ${({ theme }) => theme.spacing.lg} 0;
    border-bottom: 2px solid ${({ theme }) => theme.colors.navyLight};
`;

const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xl};
`;

const Logo = styled(Link)`
    font-size: ${({ theme }) => theme.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primary};
    transition: all ${({ theme }) => theme.transitions.fast};
    text-shadow: ${({ theme }) => theme.shadows.glow};

    &:hover {
        color: ${({ theme }) => theme.colors.primaryLight};
        transform: scale(1.05);
    }
`;

const Nav = styled.nav<{ $isOpen: boolean }>`
    display: flex;
    gap: ${({ theme }) => theme.spacing.xl};

    @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 280px;
        background-color: ${({ theme }) => theme.colors.backgroundAlt};
        flex-direction: column;
        padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.xl};
        box-shadow: ${({ theme }) => theme.shadows.xl};
        transform: translateX(${({ $isOpen }) => $isOpen ? '0' : '100%'});
        transition: transform ${({ theme }) => theme.transitions.normal};
        z-index: 1000;
        border-left: 2px solid ${({ theme }) => theme.colors.navyLight};
    }
`;

const NavLink = styled(Link)`
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    transition: color ${({ theme }) => theme.transitions.fast};
    white-space: nowrap;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const PhoneLink = styled.a`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    font-size: ${({ theme }) => theme.fontSize.lg};
    transition: all ${({ theme }) => theme.transitions.fast};

    &:hover {
        color: ${({ theme }) => theme.colors.primaryLight};
        text-shadow: ${({ theme }) => theme.shadows.glow};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize.base};
    }
`;

const MenuButton = styled.button`
    display: none;
    background: none;
    color: ${({ theme }) => theme.colors.primary};
    padding: ${({ theme }) => theme.spacing.sm};

    @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
        display: flex;
    }
`;

const CloseButton = styled.button`
    display: none;
    position: absolute;
    top: ${({ theme }) => theme.spacing.lg};
    right: ${({ theme }) => theme.spacing.lg};
    background: none;
    color: ${({ theme }) => theme.colors.primary};
    padding: ${({ theme }) => theme.spacing.sm};

    @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
        display: flex;
    }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
    display: none;

    @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
        display: ${({ $isOpen }) => $isOpen ? 'block' : 'none'};
        position: fixed;
        inset: 0;
        background-color: rgba(10, 22, 40, 0.9);
        z-index: 999;
    }
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.lg};
`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition, behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();

    if (pathname !== '/' && pathname !== '/dez-site' && pathname !== '/dez-site/') {
      window.location.href = `/#${sectionId}`;
    } else {
      scrollToSection(sectionId);
    }
  };

  return (<>
    <HeaderWrapper>
      <Container>
        <HeaderContent>
          <Logo href='/' onClick={() => setIsMenuOpen(false)}>
            НПП «БИОХИММАШ»
          </Logo>

          <Nav $isOpen={isMenuOpen}>
            <CloseButton onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </CloseButton>

            <NavLink href='/' onClick={() => setIsMenuOpen(false)}>
              Главная
            </NavLink>

            <NavLink
              href='/#services'
              onClick={(e) => handleAnchorClick(e, 'services')}
            >
              Услуги
            </NavLink>

            <NavLink href='/industries' onClick={() => setIsMenuOpen(false)}>
              Отрасли
            </NavLink>

            <NavLink
              href='/#prices'
              onClick={(e) => handleAnchorClick(e, 'prices')}
            >
              Цены
            </NavLink>

            <NavLink href='/about' onClick={() => setIsMenuOpen(false)}>
              О нас
            </NavLink>

            <NavLink href='/contacts' onClick={() => setIsMenuOpen(false)}>
              Контакты
            </NavLink>
          </Nav>

          <RightSection>
            <PhoneLink href='tel:+74959564855'>
              <Phone size={20} />
              <span>+7 (495) 956-48-55</span>
            </PhoneLink>

            <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={24} />
            </MenuButton>
          </RightSection>
        </HeaderContent>
      </Container>
    </HeaderWrapper>

    <Overlay $isOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />
  </>);
}
