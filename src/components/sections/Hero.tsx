// src/components/sections/Hero.tsx
'use client'

import styled from 'styled-components'
import { Phone, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import { Button } from '@/components/common/Button'

const HeroSection = styled.section`
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary}15 0%, 
    ${({ theme }) => theme.colors.background} 100%
  );
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 500px;
    padding: ${({ theme }) => theme.spacing.xxl} 0;
  }
`

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxxl};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xxl};
    text-align: center;
  }
`

const HeroText = styled.div`
  z-index: 2;
`

const HeroTitle = styled(motion.h1)`
  font-size: ${({ theme }) => theme.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.2;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize['3xl']};
  }
`

const HeroDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    justify-content: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const HeroImageWrapper = styled(motion.div)`
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`

const HeroImage = styled.div`
  width: 100%;
  height: 400px;
  background: ${({ theme }) => theme.colors.primary}20;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize['4xl']};
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.xl};
`

const FeaturesList = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};

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
    background-color: ${({ theme }) => theme.colors.success};
    color: white;
    border-radius: 50%;
    flex-shrink: 0;
  }
`

export default function Hero() {
  return (
    <HeroSection>
      <Container>
        <HeroContent>
          <HeroText>
            <HeroTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Профессиональная <span>дезинсекция</span> в Москве
            </HeroTitle>

            <HeroDescription
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Уничтожение клопов, тараканов, клещей и других вредителей.
              Гарантия результата. Выезд в день обращения.
            </HeroDescription>

            <FeaturesList
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <FeatureItem>Работаем с 2010 года</FeatureItem>
              <FeatureItem>Гарантия до 3 лет</FeatureItem>
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
                +7 (999) 123-45-67
              </Button>
            </HeroButtons>
          </HeroText>

          <HeroImageWrapper
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HeroImage>
              🦟 🚫
            </HeroImage>
          </HeroImageWrapper>
        </HeroContent>
      </Container>
    </HeroSection>
  )
}
