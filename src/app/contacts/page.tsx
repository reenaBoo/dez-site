'use client';

import styled, { keyframes } from 'styled-components';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import Container from '@/components/layout/Container';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); }
  to { transform: translateY(0); }
`;

const sweep = keyframes`
  0% { transform: translateX(-140%) skewX(-14deg); }
  100% { transform: translateX(140%) skewX(-14deg); }
`;

const PageWrapper = styled.div`
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding: 140px 0 80px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 120px 0 64px;
  }
`;

const LightCone = styled.div`
  position: absolute;
  inset: -10% -10% 0;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(
    112deg,
    transparent 42%,
    rgba(235, 210, 150, 0.04) 52%,
    rgba(235, 210, 150, 0.09) 58%,
    rgba(235, 210, 150, 0.04) 64%,
    transparent 74%
  );
  mask-image: linear-gradient(to bottom, black 0%, transparent 88%);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
`;

const Eyebrow = styled.div`
  opacity: 0;
  animation: ${fadeUp} 0.6s ease-out 0.1s forwards;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 10px rgba(217, 177, 95, 0.9);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.5625rem;
    letter-spacing: 0.14em;
  }
`;

const Title = styled.h1`
  animation: ${slideUp} 0.6s ease-out;
  font-size: clamp(2.05rem, 5.5vw, 4.4rem);
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  line-height: 1.06;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  span {
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: 0 0 40px rgba(217, 177, 95, 0.35);
  }
`;

const Subtitle = styled.p`
  opacity: 0;
  animation: ${fadeUp} 0.7s ease-out 0.3s forwards;
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 560px;
  line-height: 1.7;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const ContactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    margin-top: ${({ theme }) => theme.spacing.xl};
  }
`;

const ContactCard = styled.div`
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease-out forwards;
  background:
    linear-gradient(165deg, rgba(217, 177, 95, 0.04) 0%, transparent 36%),
    ${({ theme }) => theme.colors.navy};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  transition: border-color ${({ theme }) => theme.transitions.normal}, box-shadow ${({ theme }) => theme.transitions.normal};

  &:nth-child(1) { animation-delay: 0.35s; }
  &:nth-child(2) { animation-delay: 0.45s; }
  &:nth-child(3) { animation-delay: 0.55s; }
  &:nth-child(4) { animation-delay: 0.65s; }

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

const CardLabel = styled.h2`
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

export default function ContactsPage() {
  return (
    <PageWrapper>
      <LightCone/>

      <Container>
        <ContentWrapper>
          <Eyebrow>
            ООО «НПП „Биохиммаш“» · Ежедневно 8:00 — 22:00
          </Eyebrow>

          <Title>
            Свяжитесь <span>с нами</span>
          </Title>

          <Subtitle>
            Позвоните, напишите на почту или в Telegram — оперативно ответим,
            проконсультируем и организуем выезд специалиста.
          </Subtitle>

          <ContactsGrid>
            <ContactCard data-index='01'>
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

            <ContactCard data-index='02'>
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

            <ContactCard data-index='03'>
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

            <ContactCard data-index='04'>
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
        </ContentWrapper>
      </Container>
    </PageWrapper>
  );
}
