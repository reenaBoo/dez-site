'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Utensils, Wheat, GraduationCap, Building2, Home, Factory } from 'lucide-react'
import Container from '@/components/layout/Container'

const IndustriesSection = styled.section`
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
  max-width: 700px;
  margin: 0 auto;
`

const IndustriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const IndustryCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border: 2px solid ${({ theme }) => theme.colors.navyLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
    transform: translateY(-4px);
  }
`

const IndustryIcon = styled.div`
  width: 64px;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.navy};
  box-shadow: ${({ theme }) => theme.shadows.glow};
`

const IndustryTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const IndustryList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const IndustryItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.base};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: 1.6;

  &::before {
    content: '•';
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2em;
    font-weight: bold;
    margin-top: -2px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const industries = [
  {
    icon: Utensils,
    title: 'Рестораны и пищевые производства',
    items: [
      'Разработка Программ пест-контроля, мониторинг, профилактические и истребительные мероприятия',
      'Отчётные документы для проверок',
    ],
  },
  {
    icon: Wheat,
    title: 'Агрохолдинги и фермеры',
    items: [
      'Уничтожение борщевика и многолетних сорняков (1-2 обработки за сезон)',
      'Обработка полей, обочин, складов, теплиц и животноводческих помещений',
      'План восстановления травостоя',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Образовательные и госучреждения',
    items: [
      'Профилактические и истребительные мероприятия по утверждённым регламентам',
    ],
  },
  {
    icon: Building2,
    title: 'ТСЖ/УК и девелоперы',
    items: [
      'Плановая дератизация придомовых территорий',
      'Локализация очагов на стройках и при ремонтах',
      'Инструкции для подрядчиков',
    ],
  },
  {
    icon: Home,
    title: 'Жилые помещения',
    items: [
      'Комплексная обработка квартир и домов',
      'Уничтожение клопов, тараканов, блох',
      'Гарантия результата до 3 лет',
    ],
  },
  {
    icon: Factory,
    title: 'Производственные объекты',
    items: [
      'Обработка складских помещений',
      'Дератизация территорий',
      'Регулярный мониторинг',
    ],
  },
]

export default function Industries() {
  return (
    <IndustriesSection id="industries">
      <Container>
        <SectionHeader>
          <SectionTitle>
            <span>Отраслевые</span> решения
          </SectionTitle>
          <SectionDescription>
            Индивидуальный подход к каждой отрасли. Работаем с учётом специфики
            вашего бизнеса и требований контролирующих органов.
          </SectionDescription>
        </SectionHeader>

        <IndustriesGrid>
          {industries.map((industry, index) => (
            <IndustryCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <IndustryIcon>
                <industry.icon size={32} />
              </IndustryIcon>

              <IndustryTitle>{industry.title}</IndustryTitle>

              <IndustryList>
                {industry.items.map((item, idx) => (
                  <IndustryItem key={idx}>{item}</IndustryItem>
                ))}
              </IndustryList>
            </IndustryCard>
          ))}
        </IndustriesGrid>
      </Container>
    </IndustriesSection>
  )
}
