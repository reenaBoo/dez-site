'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Bug, Rat, Check, Leaf, FlaskConical } from 'lucide-react';
import Container from '@/components/layout/Container';

const ServicesSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xxxl} 0;
    background-color: ${({ theme }) => theme.colors.backgroundAlt};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0 0 ${({ theme }) => theme.spacing.xl} 0;
    }
`;

const ServiceCard = styled(motion.div)`
    background-color: ${({ theme }) => theme.colors.navy};
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
    max-width: 600px;
    margin: 0 auto;
`;

const ServicesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(350px, 450px));
    gap: ${({ theme }) => theme.spacing.xl};
    justify-content: center;
    justify-items: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        grid-template-columns: 1fr;
    }
`;

const ServiceIcon = styled.div`
    width: 64px;
    height: 64px;
    background: ${({ theme }) => theme.colors.primary};
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
const ServiceTitle = styled.h3`
    font-size: ${({ theme }) => theme.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.heading};
    margin-bottom: ${({ theme }) => theme.spacing.md};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.xl};
        margin-bottom: 0;
    }
`;

const ServiceDescription = styled.p`
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    line-height: 1.6;
`;

const ServiceFeatures = styled.ul`
    list-style: none;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

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
`;

const ServiceHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: row;
        align-items: center;
        gap: ${({ theme }) => theme.spacing.md};
        margin-bottom: ${({ theme }) => theme.spacing.md};
    }
`;

const services = [{
  icon: Bug,
  title: 'Дезинсекция',
  description: 'Комплексная борьба с различными насекомыми (тараканы, муравьи, мошки, комары, клопы, мухи, кожееды и др.). Используем профессиональные препараты.',
  features: ['Обработка по разным технологиям', 'Гели, пасты, инсектицидные концентраты, ловушки, ИК-приманки, аэрозоли', 'Акарицидные обработки для территорий (клещи)'],
}, {
  icon: FlaskConical,
  title: 'Дезинфекция',
  description: 'Обеззараживание помещений, поверхностей и транспорта.',
  features: ['Сертифицированные препараты', 'Обработка всех поверхностей', 'Безопасно для людей'],
}, {
  icon: Rat,
  title: 'Дератизация',
  description: 'Профессиональное уничтожение грызунов. Контроль популяций на объектах с высокой пищевой нагрузкой.',
  features: ['Мониторинг', 'Приманочные станции', 'Использование родентицидов с мумифицирующим эффектом', 'Отчётность'],
}, {
  icon: Leaf,
  title: 'Фитосанитарная защита',
  description: 'Обработка территорий и зелёных зон. Подбираем щадящие или усиленные программы в зависимости от ситуации. По окончании - рекомендации по восстановлению дернового покрова',
  features: ['Экологически безопасные препараты', 'Безопасно для растений и людей', 'Эффективно против борщевика Сосновского и инвазивных видов'],
}];

export default function Services() {
  return (<ServicesSection id='services'>
    <Container>
      <SectionHeader>
        <SectionTitle>
          Наши <span>услуги</span>
        </SectionTitle>
        <SectionDescription>
          Профессиональная обработка любых помещений и прилегающих территорий от вредителей. Работаем быстро,
          качественно, с гарантией.
        </SectionDescription>
      </SectionHeader>

      <ServicesGrid>
        {services.map((service, index) => (<ServiceCard
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ServiceHeader>
            <ServiceIcon>
              <service.icon />
            </ServiceIcon>
            <ServiceTitle>{service.title}</ServiceTitle>
          </ServiceHeader>

          <ServiceDescription>{service.description}</ServiceDescription>

          <ServiceFeatures>
            {service.features.map((feature, idx) => (<ServiceFeature key={idx}>
              <Check />
              {feature}
            </ServiceFeature>))}
          </ServiceFeatures>
        </ServiceCard>))}
      </ServicesGrid>
    </Container>
  </ServicesSection>);
}
