'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import Container from '@/components/layout/Container';
import { getAssetPath } from '@/utils/getAssetPath';

const PageWrapper = styled.div`
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.xxxl} 0;
    overflow: hidden;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.xxl} 0;
    }
`;

const BackgroundImage = styled.div`
    position: absolute;
    inset: 0;
    z-index: 0;

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
                to right,
                rgba(5, 11, 20, 0.75) 0%,
                rgba(10, 22, 40, 0.85) 100%
        );
    }

    img {
        object-fit: cover;
        object-position: center;
    }

    .desktop-bg {
        display: block;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        .desktop-bg {
            display: none;
        }

        &::after {
            background: linear-gradient(
                    to bottom,
                    rgba(5, 11, 20, 0.85) 0%,
                    rgba(10, 22, 40, 0.9) 100%
            );
        }
    }

    .mobile-bg {
        display: none;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        .mobile-bg {
            display: block;
        }
    }
`;

const ContentWrapper = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
        align-items: center;
    }
`;

const Title = styled.h1`
    font-size: ${({ theme }) => theme.fontSize['4xl']};
    color: ${({ theme }) => theme.colors.heading};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    text-align: center;
    width: 100%;
    max-width: 650px;

    span {
        color: ${({ theme }) => theme.colors.primary};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize['3xl']};
        text-align: center;
        max-width: 100%;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize['2xl']};
    }
`;

const ContactsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};
    width: 100%;
    max-width: 650px;
    justify-content: center;
    padding-bottom: 50px;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        grid-template-columns: 1fr;
        max-width: 500px;
        padding-bottom: 0;
        gap: ${({ theme }) => theme.spacing.lg};
    }

    & > *:nth-child(2n) {
        transform: translateY(50px);

        @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
            transform: translateY(0);
        }
    }
`;

const ContactCard = styled.div`
    background: rgba(10, 16, 24, 0.85);
    backdrop-filter: blur(10px);
    border: 2px solid ${({ theme }) => theme.colors.navyLight};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing.lg};
    transition: all ${({ theme }) => theme.transitions.normal};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
    height: 100%;
    min-height: 250px;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: ${({ theme }) => theme.shadows.glow};
        transform: translateX(-4px);
        background: rgba(10, 16, 24, 0.95);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        min-height: auto;
        padding: ${({ theme }) => theme.spacing.md};

        &:hover {
            transform: translateY(-4px);
        }
    }
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const IconWrapper = styled.div`
    width: 40px;
    height: 40px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.navy};
    box-shadow: ${({ theme }) => theme.shadows.glow};
    flex-shrink: 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 36px;
        height: 36px;

        svg {
            width: 18px;
            height: 18px;
        }
    }
`;

const CardTitle = styled.h3`
    font-size: ${({ theme }) => theme.fontSize.lg};
    color: ${({ theme }) => theme.colors.heading};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.base};
    }
`;

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
`;

const ContactInfo = styled.div`
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.xs};
    }
`;

const ContactLink = styled.a`
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    font-size: ${({ theme }) => theme.fontSize.base};
    transition: color ${({ theme }) => theme.transitions.fast};
    word-break: break-word;

    &:hover {
        color: ${({ theme }) => theme.colors.primaryLight};
        text-decoration: underline;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.sm};
    }
`;

const WorkingHours = styled.div`
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.textLight};
    margin-top: ${({ theme }) => theme.spacing.xs};
`;

const SocialButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.sm};
`;

const SocialButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.xs};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.navy};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.sm};
    text-decoration: none;
    transition: all ${({ theme }) => theme.transitions.normal};
    box-shadow: ${({ theme }) => theme.shadows.glow};

    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryLight};
        transform: translateY(-2px);
        box-shadow: 0 0 30px rgba(253, 185, 19, 0.7);
    }

    svg {
        flex-shrink: 0;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.xs};
        padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};

        svg {
            width: 16px;
            height: 16px;
        }
    }
`;

export default function ContactsPage() {
  return (<PageWrapper>
    <BackgroundImage>
      <Image
        src={getAssetPath('/images/contacts-bg.jpg')}
        alt='Свяжитесь с нами'
        fill
        priority
        quality={90}
        className='desktop-bg'
      />

      <Image
        src={getAssetPath('/images/hero-bg-mobile.jpg')}
        alt='Свяжитесь с нами'
        fill
        priority
        quality={85}
        className='mobile-bg'
      />
    </BackgroundImage>

    <Container>
      <ContentWrapper>
        <Title>
          <span>Контакты</span>
        </Title>

        <ContactsGrid>
          {/* Мессенджеры */}
          <ContactCard>
            <CardHeader>
              <IconWrapper>
                <MessageCircle size={20} />
              </IconWrapper>
              <CardTitle>Мессенджеры</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactInfo>Свяжитесь с нами удобным способом:</ContactInfo>
              <SocialButtons>
                <SocialButton
                  href='https://wa.me/74959564855'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <MessageCircle size={18} />
                  Написать в WhatsApp
                </SocialButton>
              </SocialButtons>
            </CardContent>
          </ContactCard>

          {/* Телефон */}
          <ContactCard>
            <CardHeader>
              <IconWrapper>
                <Phone size={20} />
              </IconWrapper>
              <CardTitle>Телефон</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactInfo>Звоните нам по телефону:</ContactInfo>
              <ContactLink href='tel:+74959564855'>+7 (495) 956-48-55</ContactLink>
              <WorkingHours>Ежедневно с 8:00 до 22:00</WorkingHours>
            </CardContent>
          </ContactCard>

          {/* Email */}
          <ContactCard>
            <CardHeader>
              <IconWrapper>
                <Mail size={20} />
              </IconWrapper>
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactInfo>Напишите нам на почту:</ContactInfo>
              <ContactLink href='mailto:biohimmash@mail.ru'>
                biohimmash@mail.ru
              </ContactLink>
            </CardContent>
          </ContactCard>

          {/* Адрес */}
          <ContactCard>
            <CardHeader>
              <IconWrapper>
                <MapPin size={20} />
              </IconWrapper>
              <CardTitle>Адрес офиса</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactInfo>
                107076, г. Москва, пер. Большой Матросский, д. 1, эт. 1, пом. XXVII, ком. 19
              </ContactInfo>
            </CardContent>
          </ContactCard>
        </ContactsGrid>
      </ContentWrapper>
    </Container>
  </PageWrapper>);
}
