// src/app/about/page.tsx
'use client';

import styled from 'styled-components';
import { Download, ExternalLink } from 'lucide-react';
import Container from '@/components/layout/Container';

const PageWrapper = styled.div`
    min-height: 60vh;
    padding: ${({ theme }) => theme.spacing.xxxl} 0;
    background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.h1`
    font-size: ${({ theme }) => theme.fontSize['4xl']};
    color: ${({ theme }) => theme.colors.heading};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Content = styled.div`
    max-width: 900px;
    margin: 0 auto;
`;

const Section = styled.section`
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
    font-size: ${({ theme }) => theme.fontSize['2xl']};
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Text = styled.p`
    font-size: ${({ theme }) => theme.fontSize.lg};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.8;
    margin-bottom: ${({ theme }) => theme.spacing.md};

    span {
        color: ${({ theme }) => theme.colors.primary};
        font-weight: ${({ theme }) => theme.fontWeight.semibold};
    }
`;

const List = styled.ul`
    list-style: none;
    margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ListItem = styled.li`
    display: flex;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.base};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    line-height: 1.6;

    &::before {
        content: '■';
        color: ${({ theme }) => theme.colors.primary};
        font-size: 0.8em;
        margin-top: 0.3em;
    }
`;

const LicenseSection = styled(Section)`
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    border: 2px solid ${({ theme }) => theme.colors.navyLight};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing.xxl};
    margin-top: ${({ theme }) => theme.spacing.xxxl};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.xl};
    }
`;

const LicenseList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
`;

const LicenseItem = styled.li`
    display: flex;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.base};
    line-height: 1.6;

    &::before {
        content: '■';
        color: ${({ theme }) => theme.colors.primary};
        font-size: 0.8em;
        margin-top: 0.3em;
        flex-shrink: 0;
    }
`;

const ButtonsGroup = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.xl};
    flex-wrap: wrap;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        flex-direction: column;
    }
`;

const DownloadButton = styled.a`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.navy};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    text-decoration: none;
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.normal};
    box-shadow: ${({ theme }) => theme.shadows.glow};

    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryLight};
        transform: translateY(-2px);
        box-shadow: 0 0 30px rgba(253, 185, 19, 0.7);
    }

    svg {
        flex-shrink: 0;
    }
`;

const SecondaryButton = styled.a`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    text-decoration: none;
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.normal};

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.navy};
        transform: translateY(-2px);
    }

    svg {
        flex-shrink: 0;
    }
`;

export default function AboutPage() {
  return (<PageWrapper>
    <Container>
      <Content>
        <Title>О компании</Title>

        <Section>
          <Text>
            <span>ООО «НПП «БИОХИММАШ»</span> - специализированная компания полного цикла.
            Выполняем дезинсекцию (включая акарицидные обработки), дератизацию, дезинфекцию
            помещений, оборудования и транспорта, а также фитосанитарную обработку территорий
            (в т.ч. удаление инвазивных видов, таких как борщевик Сосновского).
          </Text>
          <Text>
            Работаем по утверждённым регламентам, документируем все этапы и обеспечиваем
            контроль качества.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Наши преимущества</SectionTitle>
          <List>
            <ListItem>
              Производственный контроль (ППК) под требования Роспотребнадзора, журналы учёта,
              акты, протоколы, технологические карты
            </ListItem>
            <ListItem>
              Обученный персонал (гражданство РФ), использование современных методик (в т.ч.
              сухая обработка), СИЗ и современное оборудование
            </ListItem>
            <ListItem>Работаем с 2002 года — более 20 лет опыта</ListItem>
            <ListItem>Гарантия результата</ListItem>
            <ListItem>Безопасные сертифицированные препараты</ListItem>
            <ListItem>Выезд специалиста в день обращения</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Клиенты и опыт</SectionTitle>
          <Text>
            Работаем с объектами любой сложности. Среди реализованных проектов и категорий
            клиентов:
          </Text>
          <List>
            <ListItem>Maison Dellos (рестораны, сеть «МуМу» и др.)</ListItem>
            <ListItem>Бизнес-залы</ListItem>
            <ListItem>Бизнесцентры</ListItem>
            <ListItem>Объекты Министерства обороны</ListItem>
            <ListItem>Объекты Минздрава</ListItem>
            <ListItem>ООО «ВсеИнструменты.Ру»</ListItem>
            <ListItem>ООО «РБЕ»</ListItem>
            <ListItem>ООО «СИМПЛ ФУД»</ListItem>
            <ListItem>Сеть зоомагазинов «Бетховен»</ListItem>
            <ListItem>Сеть кафе «PIMS»</ListItem>
            <ListItem>Сеть кафе «Штолле»</ListItem>
            <ListItem>Социальные объекты</ListItem>
            <ListItem>Хадасса Медикал</ListItem>
            <ListItem>Школы Москвы</ListItem>
          </List>
          <Text style={{ marginTop: '1.5rem' }}>
            <strong>География:</strong> Москва, Московская область и регионы РФ.
          </Text>
        </Section>

        <LicenseSection>
          <SectionTitle>Лицензия</SectionTitle>
          <LicenseList>
            <LicenseItem>ЕРУЛ №: Л064-00111-77/01975167</LicenseItem>
            <LicenseItem>Рег. номер лицензии: 77.01.13.003.Л.000163.03.25</LicenseItem>
            <LicenseItem>Дата предоставления: 11.03.2025</LicenseItem>
            <LicenseItem>Приказ лицензирующего органа: № 88 от 11.03.2025</LicenseItem>
            <LicenseItem>
              Лицензирующий орган: Управление Роспотребнадзора по г. Москве
            </LicenseItem>
            <LicenseItem>
              Вид деятельности: услуги по дезинфекции, дезинсекции и дератизации
            </LicenseItem>
          </LicenseList>

          <ButtonsGroup>
            <SecondaryButton
              href='https://fp.rospotrebnadzor.ru/licen/?record_uuid=48fd48e7-fe83-11ef-9d7d-40f2e9218cba'
              target='_blank'
              rel='noopener noreferrer'
            >
              <ExternalLink size={20} />
              Проверить запись в реестре
            </SecondaryButton>

            <DownloadButton href='/documents/license.pdf' download>
              <Download size={20} />
              Скачать выписку (PDF)
            </DownloadButton>
          </ButtonsGroup>
        </LicenseSection>
      </Content>
    </Container>
  </PageWrapper>);
}
