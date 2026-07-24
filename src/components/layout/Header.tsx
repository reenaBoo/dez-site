'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Menu, X } from 'lucide-react';
import Container from './Container';
import { useScrollToSection } from '@/hooks/useScrollToSection';

const HeaderWrapper = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding: ${({ theme, $scrolled }) => ($scrolled ? theme.spacing.sm : theme.spacing.md)} 0;
  background: ${({ $scrolled }) => ($scrolled ? 'rgba(10, 10, 12, 0.82)' : 'transparent')};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(14px)' : 'none')};
  border-bottom: 1px solid ${({ $scrolled }) => ($scrolled ? 'rgba(217, 177, 95, 0.12)' : 'transparent')};
  transition: all ${({ theme }) => theme.transitions.normal};
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.85;
  }
`;

const LogoMark = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

const LogoText = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.base};
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.heading};
  white-space: nowrap;

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const Nav = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(340px, 100%);
    background: rgba(10, 10, 12, 0.97);
    backdrop-filter: blur(18px);
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.xxl};
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
    transition: transform ${({ theme }) => theme.transitions.normal};
    z-index: 1000;
    border-left: 1px solid rgba(217, 177, 95, 0.15);
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const NavLink = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6875rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  transition: color ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const PhoneLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.sm};
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.heading};
  transition: color ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const CTAButton = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6875rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid rgba(217, 177, 95, 0.55);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 10px 18px;
  transition: all ${({ theme }) => theme.transitions.normal};
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.wide}) {
    display: none;
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
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    background: rgba(5, 5, 6, 0.8);
    z-index: 998;
    cursor: pointer;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollToSection } = useScrollToSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <>
      <Overlay $isOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)}/>
      <HeaderWrapper $scrolled={scrolled}>
        <Container>
          <HeaderContent>
            <Logo href='/' onClick={() => setIsMenuOpen(false)}>
              <LogoMark>БХ</LogoMark>
              <LogoText>
                НПП <em>«БИОХИММАШ»</em>
              </LogoText>
            </Logo>

            <Nav $isOpen={isMenuOpen}>
              <CloseButton onClick={() => setIsMenuOpen(false)}>
                <X size={24}/>
              </CloseButton>

              <NavLink
                href='/#services'
                onClick={(e) => handleAnchorClick(e, 'services')}
              >
                Услуги
              </NavLink>

              <NavLink
                href='/#geography'
                onClick={(e) => handleAnchorClick(e, 'geography')}
              >
                География
              </NavLink>

              <NavLink href='/industries' onClick={() => setIsMenuOpen(false)}>
                Отрасли
              </NavLink>

              <NavLink
                href='/#clients'
                onClick={(e) => handleAnchorClick(e, 'clients')}
              >
                Клиенты
              </NavLink>

              <NavLink
                href='/#prices'
                onClick={(e) => handleAnchorClick(e, 'prices')}
              >
                Цены
              </NavLink>

              <NavLink
                href='/#contacts'
                onClick={(e) => handleAnchorClick(e, 'contacts')}
              >
                Контакты
              </NavLink>
            </Nav>

            <RightSection>
              <PhoneLink href='tel:+74959564855'>+7 (495) 956-48-55</PhoneLink>
              <CTAButton href='tel:+74959564855'>Вызвать специалиста</CTAButton>

              <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label='Открыть меню'>
                <Menu size={24}/>
              </MenuButton>
            </RightSection>
          </HeaderContent>
        </Container>
      </HeaderWrapper>
    </>
  );
}
