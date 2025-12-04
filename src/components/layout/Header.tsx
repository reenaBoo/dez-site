'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { Phone, Menu, X } from 'lucide-react';
import Container from './Container';
import { useScrollToSection } from '@/hooks/useScrollToSection';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: ${({ theme }) => theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 999;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.navyLight};
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md} 0;
  }
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
    opacity: 0.8;
  }
`;

const LogoImage = styled(Image)`
  object-fit: contain;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 50px;
    height: 50px;
  }
`;

const LogoText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.base};
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
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
    transition: transform ${({ theme }) => theme.transitions.normal};
    z-index: 1000;
    border-left: 2px solid ${({ theme }) => theme.colors.navyLight};
    overflow-y: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 100%;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
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
    background-color: rgba(10, 22, 40, 0.95);
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
  const { scrollToSection } = useScrollToSection();

  const handleAnchorClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <>
      <Overlay $isOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)}/>
      <HeaderWrapper>
        <Container>
          <HeaderContent>
            <Logo href='/' onClick={() => setIsMenuOpen(false)}>
              <LogoImage
                src={'/images/logo.png'}
                alt='НПП БИОХИММАШ'
                width={60}
                height={60}
                priority
              />
              <LogoText>НПП «БИОХИММАШ»</LogoText>
            </Logo>

            <Nav $isOpen={isMenuOpen}>
              <CloseButton onClick={() => setIsMenuOpen(false)}>
                <X size={24}/>
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

              <NavLink
                href='/#prices'
                onClick={(e) => handleAnchorClick(e, 'prices')}
              >
                Цены
              </NavLink>

              <NavLink href='/industries' onClick={() => setIsMenuOpen(false)}>
                Отрасли
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
                <Phone size={20}/>
                <span>+7 (495) 956-48-55</span>
              </PhoneLink>

              <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu size={24}/>
              </MenuButton>
            </RightSection>
          </HeaderContent>
        </Container>
      </HeaderWrapper>
    </>
  );
}
