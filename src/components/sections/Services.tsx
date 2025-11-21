'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Bug, Rat, Check, Leaf, FlaskConical } from 'lucide-react';
import Container from '@/components/layout/Container';

const ServicesSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xxxl} 0;
    background-color: ${({ theme }) => theme.colors.backgroundAlt}; // Темный фон
`;

const ServiceCard = styled(motion.div)`
    background-color: ${({ theme }) => theme.colors.navy}; // Темнее карточки
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
`;

const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxxl};
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
    background: ${({ theme }) => theme.colors.primary}; // Желтый фон
    border-radius: ${({ theme }) => theme.borderRadius.md};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.navy}; // Темно-синяя иконка
    box-shadow: ${({ theme }) => theme.shadows.glow};
`;

const ServiceTitle = styled.h3`
    font-size: ${({ theme }) => theme.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.heading};
    margin-bottom: ${({ theme }) => theme.spacing.md};
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

const services = [{
  icon: Bug, title: 'Дезинсекция',
  description: 'Комплексная борьба с различными насекомыми (тараканы, муравьи, мошки, комары, клопы, мухи, кожееды и др.). Используем профессиональные препараты.',
  features: ['Обработка горячим туманом', 'Гели, пасты, инсектицидные концентраты, ловушки, ИК-приманки, аэрозоли', 'Акарицидные обработки для территорий (клещи)'],
}, {
  icon: FlaskConical, title: 'Дезинфекция',
  description: 'Обеззараживание помещений, поверхностей и транспорта. Противовирусные и антибактериальные протоколы с контролем времени экспозиции и концентраций, безопасные для персонала и оборудования.',
  features: ['Сертифицированные препараты', 'Обработка всех поверхностей', 'Безопасно для людей'],
}, {
  icon: Rat, title: 'Дератизация', description: 'Профессиональное уничтожение грызунов. Контроль популяций на объектах с высокой пищевой нагрузкой.',
  features: ['Мониторинг', 'Приманочные станции, блокировка путей проникновения', 'Использование родентицидов с мумифицирующим эффектом', 'Отчётность'],
}, {
  icon: Leaf, title: 'Фитосанитарная защита',
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
            Профессиональная обработка любых помещений от вредителей.
            Работаем быстро, качественно, с гарантией.
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
              <ServiceIcon>
                <service.icon size={32} />
              </ServiceIcon>

              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>

              <ServiceFeatures>
                {service.features.map((feature, idx) => (<ServiceFeature key={idx}>
                    <Check size={16} />
                    {feature}
                  </ServiceFeature>))}
              </ServiceFeatures>
            </ServiceCard>))}
        </ServicesGrid>
      </Container>
    </ServicesSection>);
}
