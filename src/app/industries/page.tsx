'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Utensils, Wheat, GraduationCap, Building2, Home, Factory } from 'lucide-react';
import Container from '@/components/layout/Container';
import InsectDecoration from '@/components/common/InsectDecoration';

const IndustriesSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xxxl} 0;
    background-color: ${({ theme }) => theme.colors.background};
    position: relative;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.xl} 0 0 0;
    }
`;

const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxxl};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-bottom: ${({ theme }) => theme.spacing.xl};
    }
`;

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

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize['2xl']};
    }
`;

const SectionDescription = styled.p`
    font-size: ${({ theme }) => theme.fontSize.lg};
    color: ${({ theme }) => theme.colors.textLight};
    max-width: 700px;
    margin: 0 auto;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.base};
    }
`;

const IndustriesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.spacing.md};
    }
`;

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

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.lg};
    }
`;

const IndustryHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: ${({ theme }) => theme.spacing.lg};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: row;
        align-items: center;
        gap: ${({ theme }) => theme.spacing.md};
        margin-bottom: ${({ theme }) => theme.spacing.md};
    }
`;

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
    flex-shrink: 0;

    svg {
        width: 32px;
        height: 32px;
        min-width: 32px;
        min-height: 32px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 48px;
        height: 48px;
        margin-bottom: 0;

        svg {
            width: 24px;
            height: 24px;
            min-width: 24px;
            min-height: 24px;
        }
    }
`;

const IndustryTitle = styled.h3`
    font-size: ${({ theme }) => theme.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.heading};
    margin: 0;
    line-height: 1.3;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.lg};
        line-height: 1.4;
    }
`;

const IndustryList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const IndustryItem = styled.li`
    display: flex;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.base};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    line-height: 1.6;
    padding-right: ${({ theme }) => theme.spacing.xs};

    &::before {
        content: '•';
        color: ${({ theme }) => theme.colors.primary};
        font-size: 1.2em;
        font-weight: bold;
        margin-top: -2px;
        flex-shrink: 0;
    }

    &:last-child {
        margin-bottom: 0;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.sm};
        gap: ${({ theme }) => theme.spacing.xs};
        padding-right: 0;
    }
`;

const industries = [{
  icon: Utensils,
  title: 'Рестораны и пищевые производства',
  items: ['Разработка программ пест-контроля, мониторинг, профилактические и истребительные мероприятия', 'Отчётные документы для проверок'],
}, {
  icon: Wheat,
  title: 'Агрохолдинги и фермеры',
  items: ['Уничтожение борщевика и многолетних сорняков (1-2 обработки за сезон)', 'Обработка полей, обочин, складов, теплиц и животноводческих помещений', 'План восстановления травостоя'],
}, {
  icon: GraduationCap, title: 'Образовательные и госучреждения', items: ['Профилактические и истребительные мероприятия по утверждённым регламентам'],
}, {
  icon: Building2,
  title: 'ТСЖ/УК и девелоперы',
  items: ['Плановая дератизация придомовых территорий', 'Локализация очагов на стройках и при ремонтах', 'Инструкции для подрядчиков'],
}, {
  icon: Home, title: 'Офисные помещения', items: ['Комплексная обработка офисов', 'Уничтожение клопов, тараканов, блох', 'Гарантия результата'],
}, {
  icon: Factory, title: 'Производственные объекты', items: ['Обработка складских помещений', 'Дератизация территорий', 'Мониторинг'],
}];

export default function Industries() {
  return (<IndustriesSection id='industries'>
    <InsectDecoration
      src='/images/bug-1.svg'
      top='10%'
      left='10%'
    />
    <InsectDecoration
      src='/images/bug.svg'
      bottom='30%'
      right='10%'
    />
    <Container>
      <SectionHeader>
        <SectionTitle>
          <span>Отраслевые</span> решения
        </SectionTitle>
        <SectionDescription>
          Индивидуальный подход к каждой отрасли. Работаем с учётом специфики вашего
          бизнеса и требований контролирующих органов.
        </SectionDescription>
      </SectionHeader>

      <IndustriesGrid>
        {industries.map((industry, index) => (<IndustryCard
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <IndustryHeader>
            <IndustryIcon>
              <industry.icon />
            </IndustryIcon>
            <IndustryTitle>{industry.title}</IndustryTitle>
          </IndustryHeader>

          <IndustryList>
            {industry.items.map((item, idx) => (<IndustryItem key={idx}>{item}</IndustryItem>))}
          </IndustryList>
        </IndustryCard>))}
      </IndustriesGrid>
    </Container>
  </IndustriesSection>);
}
