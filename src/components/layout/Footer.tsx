'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import Container from './Container';

const FooterWrapper = styled.footer`
    background-color: ${({ theme }) => theme.colors.navy};
    padding: ${({ theme }) => theme.spacing.xxxl} 0 ${({ theme }) => theme.spacing.xl};
    margin-top: ${({ theme }) => theme.spacing.xxxl};
    border-top: 2px solid ${({ theme }) => theme.colors.navyLight};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.xl};
        margin-top: 0;
    }
`;

const FooterContent = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xl};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.spacing.xxl};
    }
`;

const FooterSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
`;

const FooterTitle = styled.h3`
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.heading};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const FooterText = styled.p`
    color: ${({ theme }) => theme.colors.textLight};
    line-height: 1.6;
`;

const FooterLink = styled(Link)`
    color: ${({ theme }) => theme.colors.text};
    transition: color ${({ theme }) => theme.transitions.fast};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const ContactItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};

    svg {
        flex-shrink: 0;
        margin-top: 2px;
        color: ${({ theme }) => theme.colors.primary};
        align-self: center;
    }
`;

const ContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
`;

const ContactLink = styled.a`
    color: ${({ theme }) => theme.colors.text};
    transition: color ${({ theme }) => theme.transitions.fast};
    text-decoration: none;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const WorkingHours = styled.span`
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.textLight};
`;

const SocialLinks = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.sm};
`;

const SocialLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    transition: all ${({ theme }) => theme.transitions.fast};

    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryDark};
        transform: translateY(-2px);
    }
`;

const FooterBottom = styled.div`
    padding-top: ${({ theme }) => theme.spacing.xl};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        flex-direction: column;
        text-align: center;
    }
`;

const Copyright = styled.p`
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.fontSize.sm};
`;

const FooterLinks = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.lg};
    flex-wrap: wrap;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        justify-content: center;
    }
`;

const FooterBottomLink = styled(Link)`
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.fontSize.sm};
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (<FooterWrapper>
    <Container>
      <FooterContent>
        {/* О компании */}
        <FooterSection>
          <FooterTitle>НПП «БИОХИММАШ»</FooterTitle>
          <FooterText>
            Профессиональная дезинсекция, дератизация и дезинфекция в Москве и области.
            Гарантия результата. Работаем с 2002 года.
          </FooterText>
          <SocialLinks>
            <SocialLink
              href='https://wa.me/74959564855'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='WhatsApp'
            >
              <Phone size={20} />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        {/* Навигация */}
        <FooterSection>
          <FooterTitle>Навигация</FooterTitle>
          <FooterLink href='/'>Главная</FooterLink>
          <FooterLink href='/services'>Услуги</FooterLink>
          <FooterLink href='/prices'>Цены</FooterLink>
          <FooterLink href='/about'>О компании</FooterLink>
          <FooterLink href='/contacts'>Контакты</FooterLink>
        </FooterSection>

        {/* Услуги */}
        <FooterSection>
          <FooterTitle>Услуги</FooterTitle>
          <FooterLink href='/services#bedbugs'>Уничтожение клопов</FooterLink>
          <FooterLink href='/services#cockroaches'>Уничтожение тараканов</FooterLink>
          <FooterLink href='/services#rodents'>Дератизация</FooterLink>
          <FooterLink href='/services#disinfection'>Дезинфекция</FooterLink>
          <FooterLink href='/services#ticks'>Обработка от клещей</FooterLink>
        </FooterSection>

        {/* Контакты */}
        <FooterSection>
          <FooterTitle>Контакты</FooterTitle>

          <ContactItem>
            <Phone size={18} />
            <ContactInfo>
              <ContactLink href='tel:+74959564855'>
                +7 (495) 956‑48‑55
              </ContactLink>
              <ContactLink href='tel:+74953912102'>
                +7 (495) 391-21-02
              </ContactLink>
              <WorkingHours>Ежедневно 8:00 — 22:00</WorkingHours>
            </ContactInfo>
          </ContactItem>

          <ContactItem>
            <Mail size={18} />
            <ContactLink href='mailto:biohimmash@mail.ru'>
              biohimmash@mail.ru
            </ContactLink>
          </ContactItem>

          <ContactItem>
            <MapPin size={18} />
            <span>г. Москва, пер. Большой Матросский, д. 1, эт. 1, пом. XXVII, ком. 19</span>
          </ContactItem>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>
          © {currentYear} НПП «БИОХИММАШ». Все права защищены.
        </Copyright>

        <FooterLinks>
          <FooterBottomLink href='/privacy'>
            Политика конфиденциальности
          </FooterBottomLink>
          <FooterBottomLink href='/terms'>
            Условия использования
          </FooterBottomLink>
        </FooterLinks>
      </FooterBottom>
    </Container>
  </FooterWrapper>);
}
