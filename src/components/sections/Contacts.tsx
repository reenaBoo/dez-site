'use client';

import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import Container from '@/components/layout/Container';

const ContactsSection = styled.section`
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

const ContactsGrid = styled.div`
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

const ContactCard = styled(motion.div)`
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

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(217, 177, 95, 0.45);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const CardLabel = styled.h3`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLight};
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ContactLink = styled.a`
  display: inline-block;
  align-self: flex-start;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.heading};
  transition: color ${({ theme }) => theme.transitions.fast};
  word-break: break-word;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const CardNote = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

interface ContactsProps {
  standalone?: boolean;
}

export default function Contacts({ standalone = false }: ContactsProps) {
  const reveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <ContactsSection id='contacts'>
      <Container>
        <SectionHeader>
          <SectionLabel {...reveal} transition={{ duration: 0.5 }}>
            {standalone ? 'Контакты' : '06 / Контакты'}
          </SectionLabel>
          <SectionTitle as={standalone ? motion.h1 : undefined} {...reveal} transition={{ duration: 0.5, delay: 0.08 }}>
            Свяжитесь <span>с нами</span>
          </SectionTitle>
          <SectionDescription {...reveal} transition={{ duration: 0.5, delay: 0.16 }}>
            Позвоните, напишите на почту или в Telegram — оперативно ответим,
            проконсультируем и организуем выезд специалиста.
          </SectionDescription>
        </SectionHeader>

        <ContactsGrid>
          <ContactCard
            data-index='01'
            {...reveal}
            whileHover={{ y: -4, transition: { duration: 0.25, delay: 0 } }}
            transition={{ duration: 0.5 }}
          >
            <CardHeader>
              <IconBox>
                <Phone/>
              </IconBox>
              <CardLabel>Телефон</CardLabel>
            </CardHeader>
            <CardBody>
              <ContactLink href='tel:+74959564855'>
                +7 (495) 956‑48‑55
              </ContactLink>
              <ContactLink href='tel:+74953912102'>
                +7 (495) 391‑21‑02
              </ContactLink>
              <CardNote>Ежедневно 8:00 — 22:00</CardNote>
            </CardBody>
          </ContactCard>

          <ContactCard
            data-index='02'
            {...reveal}
            whileHover={{ y: -4, transition: { duration: 0.25, delay: 0 } }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardHeader>
              <IconBox>
                <Mail/>
              </IconBox>
              <CardLabel>Email</CardLabel>
            </CardHeader>
            <CardBody>
              <ContactLink href='mailto:biohimmash@mail.ru'>
                biohimmash@mail.ru
              </ContactLink>
              <CardNote>Ответим в течение рабочего дня</CardNote>
            </CardBody>
          </ContactCard>

          <ContactCard
            data-index='03'
            {...reveal}
            whileHover={{ y: -4, transition: { duration: 0.25, delay: 0 } }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardHeader>
              <IconBox>
                <Send/>
              </IconBox>
              <CardLabel>Telegram</CardLabel>
            </CardHeader>
            <CardBody>
              <ContactLink href='https://t.me/nppbiohimmash' target='_blank' rel='noopener noreferrer'>
                @nppbiohimmash
              </ContactLink>
              <CardNote>Заявки и консультации онлайн</CardNote>
            </CardBody>
          </ContactCard>

          <ContactCard
            data-index='04'
            {...reveal}
            whileHover={{ y: -4, transition: { duration: 0.25, delay: 0 } }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CardHeader>
              <IconBox>
                <MapPin/>
              </IconBox>
              <CardLabel>Адрес офиса</CardLabel>
            </CardHeader>
            <CardBody>
              <ContactLink
                href='https://yandex.ru/maps/?text=Жуковский, улица Грищенко 5'
                target='_blank'
                rel='noopener noreferrer'
              >
                Московская область, г. Жуковский, ул. Грищенко, 5, офис 30
              </ContactLink>
              <CardNote>Откроется в Яндекс Картах</CardNote>
            </CardBody>
          </ContactCard>
        </ContactsGrid>
      </Container>
    </ContactsSection>
  );
}
