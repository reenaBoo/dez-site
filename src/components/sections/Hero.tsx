'use client'

import styled from 'styled-components'
import { Phone, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Container from '@/components/layout/Container'
import { Button } from '@/components/common/Button'

const HeroSection = styled.section`
    position: relative;
    min-height: calc(100vh - 90px); 
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.background};
    padding-top: 0; 

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        min-height: calc(100vh - 80px);
    }
`

const BackgroundImage = styled.div`
    position: absolute;
    inset: 0;
    z-index: 0;

    img {
        object-fit: cover;
        object-position: center right;
        opacity: 0.3;
    }
`

const HeroContent = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    padding: 0; 

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        text-align: center;
    }
`

const HeroText = styled.div`
    max-width: 800px;
`

const HeroTitle = styled(motion.h1)`
    font-size: ${({ theme }) => theme.fontSize['5xl']};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.heading};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    line-height: 1.2;

    .accent {
        color: ${({ theme }) => theme.colors.primary};
        text-shadow: ${({ theme }) => theme.shadows.glow};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize['3xl']};
    }
`

const HeroDescription = styled(motion.p)`
    font-size: ${({ theme }) => theme.fontSize.xl};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    line-height: 1.8;

    strong {
        color: ${({ theme }) => theme.colors.primary};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize.lg};
    }
`

const HeroButtons = styled(motion.div)`
    display: flex;
    gap: ${({ theme }) => theme.spacing.lg};
    flex-wrap: wrap;
    margin-top: ${({ theme }) => theme.spacing.xl};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        justify-content: center;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: column;
    }
`

const FeaturesList = styled(motion.ul)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xl};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        grid-template-columns: 1fr;
    }
`

const FeatureItem = styled.li`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.base};

    &::before {
        content: '✓';
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.navy};
        border-radius: 50%;
        flex-shrink: 0;
        font-weight: bold;
        box-shadow: ${({ theme }) => theme.shadows.glow};
    }
`

export default function Hero() {
  return (
    <HeroSection>
      <BackgroundImage>
        <Image
          src="/images/hero-bg.jpg"
          alt="Профессиональная дезинсекция"
          fill
          priority
          quality={90}
        />
      </BackgroundImage>

      <Container>
        <HeroContent>
          <HeroText>
            <HeroTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Профессиональная <span className="accent">дезинсекция</span> и санитарная безопасность
            </HeroTitle>

            <HeroDescription
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Дезинсекция (уничтожение насекомых), дератизация (уничтожение грызунов) <br/> и фитосанитарная обработка для физлиц
              и бизнеса в Москве, МО и ЦФО
            </HeroDescription>

            <FeaturesList
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <FeatureItem>Работаем с 2002 года</FeatureItem>
              <FeatureItem>Гарантия результата</FeatureItem>
              <FeatureItem>Безопасные препараты</FeatureItem>
              <FeatureItem>Выезд в день заказа</FeatureItem>
            </FeaturesList>

            <HeroButtons
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button as="a" href="#contact-form" size="lg">
                Заказать обработку
                <ArrowRight size={20} />
              </Button>

              <Button as="a" href="tel:+79991234567" variant="outline" size="lg">
                <Phone size={20} />
                +7 (495) 956‑48‑55
              </Button>
            </HeroButtons>
          </HeroText>
        </HeroContent>
      </Container>
    </HeroSection>
  )
}
