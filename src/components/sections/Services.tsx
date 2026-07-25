'use client';

import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Bug, Rat, Leaf, FlaskConical } from 'lucide-react';
import Container from '@/components/layout/Container';
import InsectDecoration from '@/components/common/InsectDecoration';

const ServicesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxl} 0;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionLabel = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4.2vw, 3.4rem);
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SectionDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 640px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const sweep = keyframes`
  0% { transform: translateX(-140%) skewX(-14deg); }
  100% { transform: translateX(140%) skewX(-14deg); }
`;

const ServiceCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(165deg, rgba(217, 177, 95, 0.04) 0%, transparent 36%),
    ${({ theme }) => theme.colors.navy};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  transition: border-color ${({ theme }) => theme.transitions.normal}, box-shadow ${({ theme }) => theme.transitions.normal};

  &::before {
    content: attr(data-index);
    position: absolute;
    top: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.lg};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 3.4rem;
    font-weight: 600;
    line-height: 1;
    color: rgba(243, 239, 228, 0.045);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      100deg,
      transparent 32%,
      rgba(242, 212, 139, 0.08) 50%,
      transparent 68%
    );
    transform: translateX(-140%) skewX(-14deg);
    pointer-events: none;
  }

  &:hover {
    border-color: rgba(217, 177, 95, 0.55);
    box-shadow: ${({ theme }) => theme.shadows.glow};

    &::after {
      animation: ${sweep} 1.1s ease-out;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const ServiceIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border: 1px solid rgba(217, 177, 95, 0.45);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ServiceTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.7;
`;

const ServiceFeatures = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ServiceFeature = styled.li`
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.6;

  &::before {
    content: '—';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
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
  const reveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <ServicesSection id='services'>
      <InsectDecoration
        src='/images/bug.svg'
        top='9%'
        left='58%'
        rotate={20}
      />
      <Container>
        <SectionHeader>
          <SectionLabel {...reveal} transition={{ duration: 0.5 }}>
            02 / Услуги
          </SectionLabel>
          <SectionTitle {...reveal} transition={{ duration: 0.5, delay: 0.08 }}>
            Наши <span>услуги</span>
          </SectionTitle>
          <SectionDescription {...reveal} transition={{ duration: 0.5, delay: 0.16 }}>
            Профессиональная обработка любых помещений и прилегающих территорий от вредителей. Работаем быстро,
            качественно, с гарантией.
          </SectionDescription>
        </SectionHeader>

        <ServicesGrid>
          {services.map((service, index) => (<ServiceCard
            key={index}
            data-index={String(index + 1).padStart(2, '0')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, transition: { duration: 0.25, delay: 0 } }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ServiceIcon>
              <service.icon/>
            </ServiceIcon>
            <ServiceTitle>{service.title}</ServiceTitle>

            <ServiceDescription>{service.description}</ServiceDescription>

            <ServiceFeatures>
              {service.features.map((feature, idx) => (<ServiceFeature key={idx}>
                {feature}
              </ServiceFeature>))}
            </ServiceFeatures>
          </ServiceCard>))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
}
