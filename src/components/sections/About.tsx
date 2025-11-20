'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Shield, Award, Users, TrendingUp } from 'lucide-react'
import Container from '@/components/layout/Container'

const AboutSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.colors.primary} 50%,
      transparent 100%
    );
  }
`

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxxl};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`

const TextContent = styled.div``

const SectionLabel = styled(motion.div)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary}20;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Title = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.heading};
  line-height: 1.3;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  .highlight {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize['3xl']};
  }
`

const Description = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }
`

const Subtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-left: ${({ theme }) => theme.spacing.lg};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.navy};
  border: 2px solid ${({ theme }) => theme.colors.navyLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
    transform: translateY(-4px);
  }
`

const StatIcon = styled.div`
  width: 56px;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.navy};
  box-shadow: ${({ theme }) => theme.shadows.glow};
`

const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text};
`

const stats = [
  {
    icon: Award,
    number: '2002',
    label: 'Год основания',
  },
  {
    icon: Shield,
    number: '100%',
    label: 'Гарантия результата',
  },
  {
    icon: Users,
    number: '500+',
    label: 'Довольных клиентов',
  },
  {
    icon: TrendingUp,
    number: '20+',
    label: 'Лет опыта',
  },
]

export default function About() {
  return (
    <AboutSection>
      <Container>
        <ContentWrapper>
          <TextContent>
            <SectionLabel
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              О компании
            </SectionLabel>

            <Title
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Профессиональная <span className="highlight">дезинсекция</span> и санитарная безопасность для бизнеса
            </Title>

            <Description
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Профессиональная <strong>дезинсекция</strong> (уничтожение насекомых), <strong>дератизация</strong> (уничтожение грызунов),
              <strong> дезинфекция</strong> и фитосанитарная обработка для бизнеса.
            </Description>

            <Subtitle
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              С 2002 года помогаем ресторанам, пищевым производствам, агрохолдингам,
              школам и госучреждениям обеспечивать санитарную безопасность, снижать
              риски и соблюдать требования контролирующих органов.
            </Subtitle>
          </TextContent>

          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <StatIcon>
                  <stat.icon size={28} />
                </StatIcon>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </ContentWrapper>
      </Container>
    </AboutSection>
  )
}
