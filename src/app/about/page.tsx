'use client';

import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Download, ExternalLink } from 'lucide-react';
import Container from '@/components/layout/Container';
import InsectDecoration from '@/components/common/InsectDecoration';

const PageWrapper = styled.div`
  padding-top: 72px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const HeaderSection = styled.section`
  position: relative;
  padding: ${({ theme }) => theme.spacing.xxxl} 0 ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxl} 0 ${({ theme }) => theme.spacing.xl};
  }
`;

const SectionLabel = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PageTitle = styled(motion.h1)`
  font-size: clamp(2.2rem, 4.6vw, 3.8rem);
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  max-width: 900px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LeadText = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text};
  max-width: 760px;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  strong {
    color: ${({ theme }) => theme.colors.heading};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const SubText = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  max-width: 640px;
  padding-left: ${({ theme }) => theme.spacing.lg};
  border-left: 2px solid rgba(217, 177, 95, 0.5);
`;

const PhotoBlock = styled(motion.div)`
  position: relative;
  height: clamp(260px, 42vw, 520px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing.xxl};

  img {
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(10, 10, 12, 0.2) 0%, transparent 40%, rgba(10, 10, 12, 0.8) 100%);
    pointer-events: none;
  }
`;

const PhotoCaption = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.xl};
  bottom: ${({ theme }) => theme.spacing.lg};
  z-index: 1;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.heading};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    left: ${({ theme }) => theme.spacing.lg};
    font-size: 0.625rem;
  }
`;

const Section = styled.section`
  position: relative;
  padding: ${({ theme }) => theme.spacing.xxl} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl} 0;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(1.8rem, 3.4vw, 2.8rem);
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
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const sweep = keyframes`
  0% {
    transform: translateX(-140%) skewX(-14deg);
  }
  100% {
    transform: translateX(140%) skewX(-14deg);
  }
`;

const AdvantagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const AdvantageCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  background: linear-gradient(165deg, rgba(217, 177, 95, 0.04) 0%, transparent 36%),
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
    font-size: 2.6rem;
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

const AdvantageTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const AdvantageText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.7;
`;

const ClientsGrid = styled(motion.ul)`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ClientItem = styled.li`
  position: relative;
  padding: ${({ theme }) => theme.spacing.sm} 0 ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid rgba(243, 239, 228, 0.06);
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

const GeographyNote = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLight};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LicenseCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  background: linear-gradient(165deg, rgba(217, 177, 95, 0.05) 0%, transparent 40%),
  ${({ theme }) => theme.colors.navy};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const LicenseList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const LicenseItem = styled.li`
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.7;

  &::before {
    content: '—';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
  }

  strong {
    color: ${({ theme }) => theme.colors.heading};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }
`;

const ButtonsGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 16px 30px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  background: rgba(217, 177, 95, 0.08);
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.transitions.normal};

  svg {
    flex-shrink: 0;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const GhostButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 16px 30px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.transitions.normal};

  svg {
    flex-shrink: 0;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const advantages = [{
  title: 'Документы и контроль',
  text: 'Производственный контроль (ППК) под требования Роспотребнадзора: журналы учёта, акты, протоколы, технологические карты.',
}, {
  title: 'Персонал и оборудование',
  text: 'Обученный персонал (гражданство РФ), современные методики — в том числе сухая обработка, СИЗ и профессиональное оборудование.',
}, {
  title: 'Опыт с 2002 года',
  text: 'Более 20 лет обеспечиваем санитарную безопасность бизнеса и госучреждений.',
}, {
  title: 'Гарантия результата',
  text: 'Отвечаем за качество каждой обработки и подтверждаем результат документально.',
}, {
  title: 'Безопасные препараты',
  text: 'Используем только сертифицированные препараты, безопасные для людей и животных.',
}, {
  title: 'Оперативный выезд',
  text: 'Выезд специалиста в удобное для вас время, включая срочные заявки.',
}];

const clients = [
  'Maison Dellos (рестораны, сеть «МуМу» и др.)',
  'Аэропорт «Жуковский»',
  'Бизнес-залы',
  'Бизнес-центры',
  'Группа ЛСР',
  'Объекты Министерства обороны',
  'Объекты Минздрава',
  'Объекты РПЦ',
  'ООО «Агрокомплекс»',
  'ООО «ВсеИнструменты.Ру»',
  'ООО «Мега Сервис» (ИЦ «Сколково»)',
  'ООО «РБЕ» (военное, социальное и медицинское питание, склады)',
  'ООО «СИМПЛ ФУД» (питание складских комплексов)',
  'ООО «Транслайн» (Санаторно-курортный комплекс МО)',
  'ПАО «Химлаборприбор»',
  'Сеть зоомагазинов «Бетховен»',
  'Сеть кафе «PIMS»',
  'Сеть кафе «Штолле»',
  'Социальные объекты',
  'Торговые центры',
  'УК «Преимущество»',
  'Школы Москвы',
];

export default function AboutPage() {
  const reveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <PageWrapper>
      <HeaderSection>
        <InsectDecoration
          src='/images/mosquito.svg'
          top='43%'
          right='15%'
          rotate={-14}
          hideOnMobile
        />
        <Container>
          <SectionLabel {...reveal} transition={{ duration: 0.5 }}>
            О компании
          </SectionLabel>
          <PageTitle {...reveal} transition={{ duration: 0.5, delay: 0.08 }}>
            НПП «БИОХИММАШ» — <span>санитарная безопасность</span> полного цикла
          </PageTitle>
          <LeadText {...reveal} transition={{ duration: 0.5, delay: 0.16 }}>
            <strong>ООО «НПП «БИОХИММАШ»</strong> — специализированная компания полного цикла.
            Выполняем дезинсекцию (включая акарицидные обработки), дератизацию, дезинфекцию
            помещений, оборудования и транспорта, а также фитосанитарную обработку территорий
            (в т.ч. удаление инвазивных видов, таких как борщевик Сосновского).
          </LeadText>
          <SubText {...reveal} transition={{ duration: 0.5, delay: 0.24 }}>
            Работаем по утверждённым регламентам, документируем все этапы и обеспечиваем
            контроль качества.
          </SubText>

          <PhotoBlock {...reveal} transition={{ duration: 0.6, delay: 0.3 }}>
            <Image
              src='/images/about-photo.jpg'
              alt='Специалист НПП «БИОХИММАШ» проводит обработку помещения'
              fill
              sizes='(max-width: 768px) 100vw, 1200px'
            />
            <PhotoCaption>
              Дезинсекция <span>/</span> Дератизация <span>/</span> Дезинфекция
            </PhotoCaption>
          </PhotoBlock>
        </Container>
      </HeaderSection>

      <Section>
        <Container>
          <SectionLabel {...reveal} transition={{ duration: 0.5 }}>
            01 / Преимущества
          </SectionLabel>
          <SectionTitle {...reveal} transition={{ duration: 0.5, delay: 0.08 }}>
            Почему <span>выбирают нас</span>
          </SectionTitle>
          <SectionDescription {...reveal} transition={{ duration: 0.5, delay: 0.16 }}>
            Полный цикл работ — от обследования объекта до отчётных документов для
            контролирующих органов.
          </SectionDescription>

          <AdvantagesGrid>
            {advantages.map((item, index) => (<AdvantageCard
              key={index}
              data-index={String(index + 1).padStart(2, '0')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.25, delay: 0 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <AdvantageTitle>{item.title}</AdvantageTitle>
              <AdvantageText>{item.text}</AdvantageText>
            </AdvantageCard>))}
          </AdvantagesGrid>
        </Container>
      </Section>

      <Section id='clients'>
        <InsectDecoration
          src='/images/centipede.svg'
          bottom='12%'
          left='6%'
          rotate={10}
          hideOnMobile
        />
        <Container>
          <SectionLabel {...reveal} transition={{ duration: 0.5 }}>
            02 / Клиенты и опыт
          </SectionLabel>
          <SectionTitle {...reveal} transition={{ duration: 0.5, delay: 0.08 }}>
            Нам <span>доверяют</span>
          </SectionTitle>
          <SectionDescription {...reveal} transition={{ duration: 0.5, delay: 0.16 }}>
            Работаем с объектами любой сложности. Среди реализованных проектов и категорий
            клиентов:
          </SectionDescription>

          <ClientsGrid {...reveal} transition={{ duration: 0.5, delay: 0.2 }}>
            {clients.map((client, index) => (<ClientItem key={index}>{client}</ClientItem>))}
          </ClientsGrid>

          <GeographyNote {...reveal} transition={{ duration: 0.5 }}>
            География <span>—</span> Москва, Московская область и регионы РФ
          </GeographyNote>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionLabel {...reveal} transition={{ duration: 0.5 }}>
            03 / Лицензия
          </SectionLabel>
          <SectionTitle {...reveal} transition={{ duration: 0.5, delay: 0.08 }}>
            Работаем <span>официально</span>
          </SectionTitle>

          <LicenseCard {...reveal} transition={{ duration: 0.5, delay: 0.16 }}>
            <LicenseList>
              <LicenseItem><strong>ЕРУЛ №:</strong> Л064-00111-77/01975167</LicenseItem>
              <LicenseItem><strong>Рег. номер лицензии:</strong> 77.01.13.003.Л.000163.03.25</LicenseItem>
              <LicenseItem><strong>Дата предоставления:</strong> 11.03.2025</LicenseItem>
              <LicenseItem><strong>Приказ лицензирующего органа:</strong> № 88 от 11.03.2025</LicenseItem>
              <LicenseItem>
                <strong>Лицензирующий орган:</strong> Управление Роспотребнадзора по г. Москве
              </LicenseItem>
              <LicenseItem>
                <strong>Вид деятельности:</strong> услуги по дезинфекции, дезинсекции и дератизации
              </LicenseItem>
            </LicenseList>

            <ButtonsGroup>
              <PrimaryButton href='/documents/license.pdf' download>
                <Download size={16}/>
                Скачать выписку (PDF)
              </PrimaryButton>
              <GhostButton
                href='https://fp.rospotrebnadzor.ru/licen/?record_uuid=48fd48e7-fe83-11ef-9d7d-40f2e9218cba'
                target='_blank'
                rel='noopener noreferrer'
              >
                <ExternalLink size={16}/>
                Проверить запись в реестре
              </GhostButton>
            </ButtonsGroup>
          </LicenseCard>
        </Container>
      </Section>
    </PageWrapper>
  );
}
