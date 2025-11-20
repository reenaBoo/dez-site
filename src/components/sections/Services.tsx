// src/components/sections/Services.tsx
'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Bug, Rat, Droplets, Check, ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import { Button } from '@/components/common/Button'

const ServicesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  background-color: ${({ theme }) => theme.colors.background};
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
`

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize['3xl']};
  }
`

const SectionDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 600px;
  margin: 0 auto;
`

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const ServiceCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-4px);
  }
`

const ServiceIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary} 0%, 
    ${({ theme }) => theme.colors.primaryLight} 100%
  );
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: white;
`

const ServiceTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.6;
`

const ServiceFeatures = styled.ul`
  list-style: none;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const ServiceFeature = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  svg {
    color: ${({ theme }) => theme.colors.success};
    flex-shrink: 0;
  }
`

const ServicePrice = styled.div`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ServiceButton = styled(Button)`
  width: 100%;
`

const services = [
  {
    icon: Bug,
    title: 'Уничтожение клопов',
    description: 'Полное уничтожение клопов с гарантией. Используем профессиональные препараты.',
    features: [
      'Обработка горячим туманом',
      'Безопасные препараты',
      'Гарантия 1 год',
    ],
    price: 'от 2 500 ₽',
  },
  {
    icon: Bug,
    title: 'Уничтожение тараканов',
    description: 'Эффективная обработка от тараканов. Результат уже после первой обработки.',
    features: [
      'Холодный и горячий туман',
      'Обработка труднодоступных мест',
      'Гарантия 6 месяцев',
    ],
    price: 'от 2 000 ₽',
  },
  {
    icon: Rat,
    title: 'Дератизация',
    description: 'Профессиональное уничтожение грызунов. Комплексный подход к решению проблемы.',
    features: [
      'Механические ловушки',
      'Химические препараты',
      'Гарантия 3 месяца',
    ],
    price: 'от 3 000 ₽',
  },
  {
    icon: Droplets, // 👈 Изменено здесь
    title: 'Дезинфекция',
    description: 'Полная дезинфекция помещений от вирусов и бактерий.',
    features: [
      'Сертифицированные препараты',
      'Обработка всех поверхностей',
      'Безопасно для людей',
    ],
    price: 'от 2 500 ₽',
  },
]

export default function Services() {
  return (
    <ServicesSection id="services">
      <Container>
        <SectionHeader>
          <SectionTitle>
            Наши <span>услуги</span>
          </SectionTitle>
          <SectionDescription>
            Профессиональная обработка любых помещений от вредителей.
            Работаем быстро, качественно, с гарантией.
          </SectionDescription>
        </SectionHeader>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceIcon>
                <service.icon size={32} />
              </ServiceIcon>

              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>

              <ServiceFeatures>
                {service.features.map((feature, idx) => (
                  <ServiceFeature key={idx}>
                    <Check size={16} />
                    {feature}
                  </ServiceFeature>
                ))}
              </ServiceFeatures>

              <ServicePrice>{service.price}</ServicePrice>

              <ServiceButton as="a" href="#contact-form">
                Заказать
                <ArrowRight size={18} />
              </ServiceButton>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  )
}
