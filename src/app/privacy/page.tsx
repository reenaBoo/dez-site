'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/layout/Container';

const PageWrapper = styled.div`
    padding: ${({ theme }) => theme.spacing.xxxl} 0;
    min-height: calc(100vh - 400px);
    background-color: ${({ theme }) => theme.colors.backgroundAlt};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.xxl} 0;
    }
`;

const BackButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.normal};
    margin-bottom: ${({ theme }) => theme.spacing.xl};

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.navy};
        transform: translateX(-4px);
    }

    svg {
        transition: transform ${({ theme }) => theme.transitions.fast};
    }

    &:hover svg {
        transform: translateX(-4px);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.sm};
        padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    }
`;

const Title = styled.h1`
    font-size: ${({ theme }) => theme.fontSize['4xl']};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.heading};
    margin-bottom: ${({ theme }) => theme.spacing.xl};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize['3xl']};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize['2xl']};
    }
`;

const LastUpdated = styled.p`
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
    font-style: italic;
`;

const Content = styled.div`
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.8;
    max-width: 900px;

    h2 {
        font-size: ${({ theme }) => theme.fontSize['2xl']};
        font-weight: ${({ theme }) => theme.fontWeight.semibold};
        color: ${({ theme }) => theme.colors.heading};
        margin-top: ${({ theme }) => theme.spacing.xxl};
        margin-bottom: ${({ theme }) => theme.spacing.lg};

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            font-size: ${({ theme }) => theme.fontSize.xl};
            margin-top: ${({ theme }) => theme.spacing.xl};
        }
    }

    h3 {
        font-size: ${({ theme }) => theme.fontSize.xl};
        font-weight: ${({ theme }) => theme.fontWeight.medium};
        color: ${({ theme }) => theme.colors.primary};
        margin-top: ${({ theme }) => theme.spacing.xl};
        margin-bottom: ${({ theme }) => theme.spacing.md};

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            font-size: ${({ theme }) => theme.fontSize.lg};
        }
    }

    p {
        margin-bottom: ${({ theme }) => theme.spacing.md};
        font-size: ${({ theme }) => theme.fontSize.base};

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            font-size: ${({ theme }) => theme.fontSize.sm};
        }
    }

    ul,
    ol {
        margin-left: ${({ theme }) => theme.spacing.xl};
        margin-bottom: ${({ theme }) => theme.spacing.lg};
        list-style: disc;

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            margin-left: ${({ theme }) => theme.spacing.lg};
        }
    }

    li {
        margin-bottom: ${({ theme }) => theme.spacing.sm};
        padding-left: ${({ theme }) => theme.spacing.sm};
    }

    strong {
        color: ${({ theme }) => theme.colors.primary};
        font-weight: ${({ theme }) => theme.fontWeight.semibold};
    }

    a {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: underline;
        transition: color ${({ theme }) => theme.transitions.fast};

        &:hover {
            color: ${({ theme }) => theme.colors.primaryLight};
        }
    }
`;

const ContactBox = styled.div`
    background-color: ${({ theme }) => theme.colors.navy};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing.xl};
    margin-top: ${({ theme }) => theme.spacing.xxl};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    }
`;

export default function PrivacyPage() {
  const router = useRouter();

  return (<PageWrapper>
    <Container>
      <BackButton onClick={() => router.back()}>
        <ArrowLeft size={20} />
        Назад
      </BackButton>

      <Title>Политика конфиденциальности</Title>
      <LastUpdated>Последнее обновление: 23 ноября 2025 г.</LastUpdated>

      <Content>
        <p>
          Настоящая Политика конфиденциальности персональных данных (далее — Политика)
          действует в отношении всей информации, которую ООО «НПП «БИОХИММАШ»» (далее —
          Компания) может получить о пользователе во время использования сайта и мобильных
          приложений Компании.
        </p>

        <h2>1. Определения</h2>
        <p>
          <strong>Персональные данные</strong> — любая информация, относящаяся к прямо или
          косвенно определенному или определяемому физическому лицу (субъекту персональных
          данных).
        </p>
        <p>
          <strong>Обработка персональных данных</strong> — любое действие (операция) или
          совокупность действий (операций), совершаемых с использованием средств автоматизации
          или без использования таких средств с персональными данными.
        </p>
        <p>
          <strong>Конфиденциальность персональных данных</strong> — обязательное для
          соблюдения Компанией требование не допускать их распространения без согласия субъекта
          персональных данных.
        </p>

        <h2>2. Какие персональные данные мы собираем</h2>
        <p>
          При использовании нашего сайта и оформлении заказа мы можем собирать следующую
          информацию:
        </p>
        <ul>
          <li>Фамилия, имя, отчество</li>
          <li>Контактный телефон</li>
          <li>Адрес электронной почты</li>
          <li>Адрес объекта для проведения обработки</li>
          <li>Информация о типе и площади объекта</li>
          <li>Информация о виде требуемых услуг</li>
          <li>IP-адрес и данные cookie-файлов</li>
        </ul>

        <h2>3. Цели обработки персональных данных</h2>
        <p>Компания обрабатывает персональные данные в следующих целях:</p>
        <ul>
          <li>Идентификация стороны в рамках договоров и соглашений</li>
          <li>Предоставление услуг по дезинсекции, дератизации и дезинфекции</li>
          <li>Связь с пользователем для подтверждения заказа и согласования деталей</li>
          <li>Предоставление информации об услугах компании</li>
          <li>Направление уведомлений, запросов касательно использования сайта</li>
          <li>Улучшение качества обслуживания</li>
          <li>Проведение статистических и иных исследований</li>
        </ul>

        <h2>4. Правовые основания обработки персональных данных</h2>
        <p>Компания обрабатывает персональные данные на основании:</p>
        <ul>
          <li>
            Согласия субъекта персональных данных на обработку его персональных данных
          </li>
          <li>Договоров, заключаемых между Компанией и субъектом персональных данных</li>
          <li>
            Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и других
            нормативных актов
          </li>
        </ul>

        <h2>5. Порядок сбора, хранения, передачи персональных данных</h2>

        <h3>5.1. Сбор персональных данных</h3>
        <p>
          Персональные данные предоставляются пользователем добровольно при заполнении форм на
          сайте, отправке заявок, при телефонном звонке или личном обращении в офис Компании.
        </p>

        <h3>5.2. Хранение персональных данных</h3>
        <p>
          Персональные данные хранятся на серверах Компании. Компания принимает необходимые
          организационные и технические меры для защиты персональных данных от неправомерного
          или случайного доступа, уничтожения, изменения, блокирования, копирования,
          распространения, а также от иных неправомерных действий третьих лиц.
        </p>

        <h3>5.3. Передача персональных данных</h3>
        <p>
          Компания не передает персональные данные третьим лицам, за исключением случаев,
          предусмотренных законодательством РФ, или с согласия субъекта персональных данных.
        </p>
        <p>Передача может осуществляться:</p>
        <ul>
          <li>
            Организациям, обеспечивающим техническую поддержку работы сайта (при условии
            обеспечения конфиденциальности)
          </li>
          <li>Государственным органам в случаях, установленных законодательством</li>
        </ul>

        <h2>6. Срок обработки персональных данных</h2>
        <p>
          Персональные данные обрабатываются в течение срока, необходимого для достижения целей
          обработки, после чего подлежат уничтожению, если иное не предусмотрено договором или
          законодательством РФ.
        </p>

        <h2>7. Права субъектов персональных данных</h2>
        <p>Субъект персональных данных имеет право:</p>
        <ul>
          <li>Получать информацию, касающуюся обработки его персональных данных</li>
          <li>Требовать уточнения, блокирования или уничтожения персональных данных</li>
          <li>Отозвать согласие на обработку персональных данных</li>
          <li>Обжаловать действия Компании в уполномоченном органе по защите прав субъектов</li>
          <li>Защищать свои права и законные интересы, в том числе в судебном порядке</li>
        </ul>

        <h2>8. Безопасность персональных данных</h2>
        <p>Компания применяет следующие меры безопасности:</p>
        <ul>
          <li>Назначение ответственного за организацию обработки персональных данных</li>
          <li>Применение организационных и технических мер защиты информации</li>
          <li>Ограничение доступа к персональным данным</li>
          <li>Применение средств защиты информации</li>
          <li>Контроль за принимаемыми мерами и уровнем защищенности</li>
        </ul>

        <h2>9. Использование cookie-файлов</h2>
        <p>
          Сайт использует файлы cookie для улучшения работы сайта, персонализации сервисов и
          удобства пользователей. Cookie не содержат конфиденциальной информации и не
          передаются третьим лицам.
        </p>
        <p>
          Пользователь может настроить свой браузер таким образом, чтобы отклонять все или
          некоторые cookie-файлы.
        </p>

        <h2>10. Изменение Политики конфиденциальности</h2>
        <p>
          Компания оставляет за собой право вносить изменения в настоящую Политику. Новая
          редакция Политики вступает в силу с момента ее размещения на сайте, если иное не
          предусмотрено новой редакцией.
        </p>
        <p>
          Действующая редакция Политики постоянно доступна на странице по адресу:{' '}
          <a href='/privacy'>https://биохиммаш.рф/privacy</a>
        </p>

        <h2>11. Применимое законодательство</h2>
        <p>
          К настоящей Политике и отношениям между пользователем и Компанией применяется право
          Российской Федерации.
        </p>

        <h2>12. Обратная связь</h2>

        <ContactBox>
          <h3>Контактная информация</h3>
          <p>
            По всем вопросам, связанным с обработкой персональных данных, вы можете обратиться
            к нам:
          </p>
          <p>
            <strong>ООО «НПП «БИОХИММАШ»»</strong>
          </p>
          <p>
            <strong>Телефон:</strong> <a href='tel:+74959564855'>+7 (495) 956-48-55</a>
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href='mailto:info@biokhimmash.ru'>info@biokhimmash.ru</a>
          </p>
          <p>
            <strong>Время работы:</strong> Ежедневно с 8:00 до 22:00
          </p>
        </ContactBox>
      </Content>
    </Container>
  </PageWrapper>);
}
