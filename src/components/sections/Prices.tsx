'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import Container from '@/components/layout/Container';

const PricesSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xxxl} 0;
    background-color: ${({ theme }) => theme.colors.backgroundAlt};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.xxl} 0;
    }
`;

const SectionWrapper = styled.div`
    max-width: 900px;
    margin: 0 auto;
`;

const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxxl};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
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
`;

const SectionDescription = styled.p`
    font-size: ${({ theme }) => theme.fontSize.lg};
    color: ${({ theme }) => theme.colors.textLight};
`;

const PricesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
`;

const PriceItem = styled.div<{ $isOpen: boolean }>`
    background-color: ${({ theme }) => theme.colors.navy};
    border: 2px solid ${({ theme, $isOpen }) => $isOpen ? theme.colors.primary : theme.colors.navyLight};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    overflow: hidden;
    transition: all ${({ theme }) => theme.transitions.normal};

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const PriceHeader = styled.button`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.xl};
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: all ${({ theme }) => theme.transitions.fast};

    &:hover {
        background-color: ${({ theme }) => theme.colors.navyLight};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.lg};
    }
`;

const PriceHeaderContent = styled.div`
    flex: 1;
`;

const PriceTitle = styled.h3`
    font-size: ${({ theme }) => theme.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.heading};
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize.xl};
    }
`;

const PriceValue = styled.div`
    font-size: ${({ theme }) => theme.fontSize['3xl']};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: ${({ theme }) => theme.shadows.glow};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize['2xl']};
    }
`;

const ChevronIcon = styled(motion.div)`
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
    margin-left: ${({ theme }) => theme.spacing.lg};
`;

const PriceContent = styled(motion.div)`
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
    }
`;

const PriceDescription = styled.p`
    font-size: ${({ theme }) => theme.fontSize.base};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.8;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    padding-left: ${({ theme }) => theme.spacing.md};
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
`;

const FeaturesList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FeatureItem = styled.li`
    display: flex;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.base};
    line-height: 1.6;

    svg {
        color: ${({ theme }) => theme.colors.primary};
        flex-shrink: 0;
        margin-top: 2px;
    }
`;

const PriceNote = styled.div`
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.textLight};
    font-style: italic;
    padding: ${({ theme }) => theme.spacing.md};
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
`;

const SpecialConditions = styled.div`
    margin-top: ${({ theme }) => theme.spacing.xxxl};
    padding: ${({ theme }) => theme.spacing.xxl};
    background: linear-gradient(
            135deg,
            ${({ theme }) => theme.colors.navy} 0%,
            ${({ theme }) => theme.colors.navyLight} 100%
    );
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.lg};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.lg}
    };
}
`;

const SpecialTitle = styled.h3`
    font-size: ${({ theme }) => theme.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    text-align: center;
`;

const SpecialList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
`;

const SpecialItem = styled.li`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.lg};
    line-height: 1.6;

    &::before {
        content: '★';
        color: ${({ theme }) => theme.colors.primary};
        font-size: 1.2em;
        flex-shrink: 0;
    }
`;

const pricesData = [{
  title: 'Рестораны / пищевое производство',
  price: 'от 8 000 ₽/мес',
  description: 'Стоимость зависит от площади, сложности и режима работы объекта.',
  features: ['Разработка программ пест-контроля', 'Мониторинг', 'Профилактические и истребительные мероприятия', 'Отчётные документы для проверок'],
  note: 'Стоимость рассчитывается индивидуально после осмотра объекта.',
}, {
  title: 'Фитосанитария / борщевик',
  price: 'от 250-400 ₽ за сотку',
  description: '1-2 обработки за сезон с контролем результата.',
  features: ['1-2 обработки за сезон', 'Контроль отклика и повторная обработка при необходимости', 'Отчёт с фотофиксацией', 'Рекомендации по восстановлению травостоя'],
  note: 'Итоговая цена рассчитывается после осмотра и подбора схемы.',
}];

export default function Prices() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (<PricesSection id='prices'>
    <Container>
      <SectionWrapper>
        <SectionHeader>
          <SectionTitle>
            <span>Цены</span> на услуги
          </SectionTitle>
          <SectionDescription>
            Индивидуальный расчет стоимости под ваши задачи и особенности объекта
          </SectionDescription>
        </SectionHeader>

        <PricesList>
          {pricesData.map((item, index) => (<PriceItem key={index} $isOpen={openIndex === index}>
            <PriceHeader type='button' onClick={() => toggleItem(index)}>
              <PriceHeaderContent>
                <PriceTitle>{item.title}</PriceTitle>
                <PriceValue>{item.price}</PriceValue>
              </PriceHeaderContent>
              <ChevronIcon
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={32} />
              </ChevronIcon>
            </PriceHeader>

            <AnimatePresence>
              {openIndex === index && (<PriceContent
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PriceDescription>{item.description}</PriceDescription>

                <FeaturesList>
                  {item.features.map((feature, idx) => (<FeatureItem key={idx}>
                    <Check size={20} />
                    {feature}
                  </FeatureItem>))}
                </FeaturesList>

                <PriceNote>* {item.note}</PriceNote>
              </PriceContent>)}
            </AnimatePresence>
          </PriceItem>))}
        </PricesList>

        <SpecialConditions>
          <SpecialTitle>Специальные условия</SpecialTitle>
          <SpecialList>
            <SpecialItem>
              Скидка при площадях {'>'} 50 га (фитосанитария)
            </SpecialItem>
            <SpecialItem>
              Индивидуальные SLA для сетей и крупных производств
            </SpecialItem>
            <SpecialItem>
              Консалтинг на площадке заказчика «инженер + химия» – от 100 000 ₽ за 3 дня (без учёта препаратов)
            </SpecialItem>
          </SpecialList>
        </SpecialConditions>
      </SectionWrapper>
    </Container>
  </PricesSection>);
}
