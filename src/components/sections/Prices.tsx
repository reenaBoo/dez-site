'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import Container from '@/components/layout/Container';

const PricesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;

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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const PricesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const PriceItem = styled(motion.div)<{ $isOpen: boolean }>`
  background:
    linear-gradient(165deg, rgba(217, 177, 95, 0.04) 0%, transparent 30%),
    ${({ theme }) => theme.colors.navy};
  border: 1px solid ${({ theme, $isOpen }) => $isOpen ? 'rgba(217, 177, 95, 0.55)' : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: border-color ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: rgba(217, 177, 95, 0.55);
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
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: rgba(217, 177, 95, 0.04);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const PriceHeaderContent = styled.div`
  flex: 1;
`;

const PriceTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const PriceValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0 0 26px rgba(217, 177, 95, 0.35);
  line-height: 1.1;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize['2xl']};
  }
`;

const ToggleHint = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;
  margin-left: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.625rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme, $isOpen }) => ($isOpen ? theme.colors.primary : theme.colors.textLight)};
  transition: color ${({ theme }) => theme.transitions.fast};

  svg {
    color: ${({ theme }) => theme.colors.primary};
    transition: transform ${({ theme }) => theme.transitions.normal};
    transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
  }

  span {
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      display: none;
    }
  }
`;

const PriceContent = styled(motion.div)`
  overflow: hidden;
`;

const PriceContentInner = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg};
    padding-top: ${({ theme }) => theme.spacing.md};
  }
`;

const PriceDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-left: ${({ theme }) => theme.spacing.md};
  border-left: 2px solid ${({ theme }) => theme.colors.primary};
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
  background: rgba(217, 177, 95, 0.045);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 2px solid ${({ theme }) => theme.colors.primary};
`;

const SpecialConditions = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding: ${({ theme }) => theme.spacing.xxl};
  background:
    linear-gradient(165deg, rgba(217, 177, 95, 0.07) 0%, transparent 45%),
    ${({ theme }) => theme.colors.navy};
  border: 1px solid rgba(217, 177, 95, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.base};
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
  price: 'от 10 000 ₽',
  description: '1-2 обработки за сезон с контролем результата.',
  features: ['1-2 обработки за сезон', 'Контроль отклика и повторная обработка при необходимости', 'Отчёт с фотофиксацией', 'Рекомендации по восстановлению травостоя', 'Расчет по запросу'],
  note: 'Итоговая цена рассчитывается после осмотра и подбора схемы.',
}];

export default function Prices() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const reveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <PricesSection id='prices'>
      <Container>
        <SectionWrapper>
          <SectionHeader>
            <SectionLabel {...reveal} transition={{ duration: 0.5 }}>
              05 / Цены
            </SectionLabel>
            <SectionTitle {...reveal} transition={{ duration: 0.5, delay: 0.08 }}>
              <span>Цены</span> на услуги
            </SectionTitle>
            <SectionDescription {...reveal} transition={{ duration: 0.5, delay: 0.16 }}>
              Индивидуальный расчет стоимости под ваши задачи и особенности объекта
            </SectionDescription>
          </SectionHeader>

          <PricesList>
            {pricesData.map((item, index) => {
              const isOpen = openItems.has(index);
              return (<PriceItem
                key={index}
                $isOpen={isOpen}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PriceHeader type='button' onClick={() => toggleItem(index)} aria-expanded={isOpen}>
                  <PriceHeaderContent>
                    <PriceTitle>{item.title}</PriceTitle>
                    <PriceValue>{item.price}</PriceValue>
                  </PriceHeaderContent>
                  <ToggleHint $isOpen={isOpen}>
                    <span>{isOpen ? 'Свернуть' : 'Подробнее'}</span>
                    <ChevronDown size={22}/>
                  </ToggleHint>
                </PriceHeader>

                <AnimatePresence initial={false}>
                  {isOpen && (<PriceContent
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PriceContentInner>
                      <PriceDescription>{item.description}</PriceDescription>

                      <FeaturesList>
                        {item.features.map((feature, idx) => (<FeatureItem key={idx}>
                          <Check size={20}/>
                          {feature}
                        </FeatureItem>))}
                      </FeaturesList>

                      <PriceNote>* {item.note}</PriceNote>
                    </PriceContentInner>
                  </PriceContent>)}
                </AnimatePresence>
              </PriceItem>);
            })}
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
    </PricesSection>
  );
}
