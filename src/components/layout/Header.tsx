'use client'

import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'
import { Phone, Menu, X } from 'lucide-react'
import Container from './Container'

const HeaderWrapper = styled.header`
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    position: sticky;
    top: 0;
    z-index: 100;
    padding: ${({ theme }) => theme.spacing.lg} 0;
`

const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xl};
`

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`

const Nav = styled.nav<{ $isOpen: boolean }>`
    display: flex;
    gap: ${({ theme }) => theme.spacing.xl};

    @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 280px;
        background-color: ${({ theme }) => theme.colors.background};
        flex-direction: column;
        padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.xl};
        box-shadow: ${({ theme }) => theme.shadows.xl};
        transform: translateX(${({ $isOpen }) => $isOpen ? '0' : '100%'});
        transition: transform ${({ theme }) => theme.transitions.normal};
        z-index: 1000;
    }
`

const NavLink = styled(Link)`
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: ${({ theme }) => theme.fontSize.base};
    transition: color ${({ theme }) => theme.transitions.fast};
    white-space: nowrap;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`

const PhoneLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize.lg};
  white-space: nowrap;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`

const MenuButton = styled.button`
  display: none;
  background: none;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm};
  z-index: 1001;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const CloseButton = styled.button`
  display: none;
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  background: none;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: ${({ $isOpen }) => $isOpen ? 'block' : 'none'};
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <HeaderWrapper>
        <Container>
          <HeaderContent>
            <Logo href="/" onClick={closeMenu}>
              ДезСервис
            </Logo>

            <Nav $isOpen={isMenuOpen}>
              <CloseButton onClick={closeMenu} aria-label="Закрыть меню">
                <X size={24} />
              </CloseButton>

              <NavLink href="/" onClick={closeMenu}>
                Главная
              </NavLink>
              <NavLink href="/services" onClick={closeMenu}>
                Услуги
              </NavLink>
              <NavLink href="/prices" onClick={closeMenu}>
                Цены
              </NavLink>
              <NavLink href="/about" onClick={closeMenu}>
                О нас
              </NavLink>
              <NavLink href="/contacts" onClick={closeMenu}>
                Контакты
              </NavLink>
            </Nav>

            <RightSection>
              <PhoneLink href="tel:+79991234567">
                <Phone size={20} />
                <span>+7 (999) 123-45-67</span>
              </PhoneLink>

              <MenuButton onClick={toggleMenu} aria-label="Открыть меню">
                <Menu size={24} />
              </MenuButton>
            </RightSection>
          </HeaderContent>
        </Container>
      </HeaderWrapper>

      <Overlay $isOpen={isMenuOpen} onClick={closeMenu} />
    </>
  )
}
