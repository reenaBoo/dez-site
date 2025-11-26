'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import Container from '@/components/layout/Container';

const HeroSection = styled.section`
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        min-height: auto;
        padding: ${({ theme }) => theme.spacing.xl} 0;
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
                rgba(5, 11, 20, 0.95) 0%,
                rgba(10, 22, 40, 0.8) 60%,
                rgba(10, 22, 40, 0.5) 100%
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

const Content = styled.div`
    position: relative;
    z-index: 10;
    padding: ${({ theme }) => theme.spacing.xxxl} 0;
    max-width: 900px;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: 0;
    }
`;

const Title = styled.h1`
    font-size: ${({ theme }) => theme.fontSize['5xl']};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.heading};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    line-height: 1.2;

    span {
        color: ${({ theme }) => theme.colors.primary};
        text-shadow: ${({ theme }) => theme.shadows.glow};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize['3xl']};
        margin-bottom: ${({ theme }) => theme.spacing.md};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize['2xl']};
    }
`;

const Subtitle = styled.p`
    font-size: ${({ theme }) => theme.fontSize.xl};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
    line-height: 1.6;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize.base};
        margin-bottom: ${({ theme }) => theme.spacing.lg};
    }
`;

const Features = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(200px, 320px));
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.spacing.sm};
        margin-bottom: ${({ theme }) => theme.spacing.lg};
    }
`;

const Feature = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.lg};

    svg {
        color: ${({ theme }) => theme.colors.primary};
        flex-shrink: 0;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize.base};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.sm};
        gap: ${({ theme }) => theme.spacing.xs};

        svg {
            width: 18px;
            height: 18px;
        }
    }
`;

const CTAButtons = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.lg};
    flex-wrap: wrap;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing.md};
    }
`;

const PrimaryButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xxl};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.navy};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.lg};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    transition: all ${({ theme }) => theme.transitions.normal};
    box-shadow: ${({ theme }) => theme.shadows.glow};
    border: none;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryLight};
        transform: translateY(-2px);
        box-shadow: 0 0 30px rgba(253, 185, 19, 0.7);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize.base};
        padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 100%;
    }
`;

const PhoneLink = styled.a`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xxl};
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.lg};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    transition: all ${({ theme }) => theme.transitions.normal};
    text-decoration: none;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.navy};
        transform: translateY(-2px);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize.base};
        padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 100%;
    }
`;

export default function Hero() {
  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({
        behavior: 'smooth', block: 'start',
      });
    }
  };

  return (<HeroSection>
    <BackgroundImage>
      <Image
        src={'/images/hero-bg.jpg'}
        alt='Профессиональная дезинсекция'
        fill
        priority
        quality={90}
        className='desktop-bg'
      />

      <Image
        src={'/images/hero-bg-mobile.jpg'}
        alt='Профессиональная дезинсекция'
        fill
        priority
        quality={85}
        className='mobile-bg'
      />
    </BackgroundImage>

    <Container>
      <Content>
        <Title>
          Профессиональная <span>дезинсекция</span>
          <br />и санитарная безопасность
        </Title>

        <Subtitle>
          Дезинсекция (уничтожение насекомых), дератизация (уничтожение грызунов),
          дезинфекция и фитосанитарная обработка для бизнеса в Москве, МО и ЦФО
        </Subtitle>

        <Features>
          <Feature>
            <CheckCircle size={24} />
            Работаем с 2002 года
          </Feature>
          <Feature>
            <CheckCircle size={24} />
            Безопасные препараты
          </Feature>
          <Feature>
            <CheckCircle size={24} />
            Гарантия результата
          </Feature>
          <Feature>
            <CheckCircle size={24} />
            Оперативный выезд специалиста
          </Feature>
        </Features>

        <CTAButtons>
          <PrimaryButton onClick={scrollToForm}>
            Заказать обработку
          </PrimaryButton>
          <PhoneLink href='tel:+74959564855'>
            +7 (495) 956-48-55
          </PhoneLink>
        </CTAButtons>
      </Content>
    </Container>
  </HeroSection>);
}
