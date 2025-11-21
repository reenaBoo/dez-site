'use client';

import styled, { keyframes } from 'styled-components';
import Container from '@/components/layout/Container';

const ClientsSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xxxl} 0;
    background-color: ${({ theme }) => theme.colors.background};
    overflow: hidden;
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
    max-width: 700px;
    margin: 0 auto;
`;

const SliderWrapper = styled.div`
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.xl};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: 0 ${({ theme }) => theme.spacing.md};
    }
`;

const SliderContainer = styled.div`
    overflow: hidden;
    position: relative;

    /* Градиенты по бокам для эффекта бесконечности */

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100px;
        z-index: 2;
        pointer-events: none;
    }

    &::before {
        left: 0;
        background: linear-gradient(
                to right,
                ${({ theme }) => theme.colors.background} 0%,
                transparent 100%
        );
    }

    &::after {
        right: 0;
        background: linear-gradient(
                to left,
                ${({ theme }) => theme.colors.background} 0%,
                transparent 100%
        );
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        &::before,
        &::after {
            width: 40px;
        }
    }
`;

const scroll = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
`;

const SliderTrack = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.xxl};
    animation: ${scroll} 20s linear infinite;
    width: fit-content;

    &:hover {
        animation-play-state: paused;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        gap: ${({ theme }) => theme.spacing.xl};
        animation-duration: 15s;
    }
`;

const LogoCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 280px;
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
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

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        min-width: 220px;
        padding: ${({ theme }) => theme.spacing.lg};
    }
`;

const LogoWrapper = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing.md};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        height: 80px;
    }
`;

const LogoImage = styled.img`
    width: 100%;
    height: 100%;
    max-width: 160px;
    max-height: 100px;
    object-fit: contain;
    filter: brightness(0) invert(1);
    transition: all ${({ theme }) => theme.transitions.normal};

    ${LogoCard}:hover & {
        filter: brightness(0) invert(1) opacity(0.85);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        max-width: 120px;
        max-height: 80px;
    }
`;

const LogoPlaceholder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.fontSize['3xl']};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primary};
    text-align: center;
    line-height: 1.2;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize['2xl']};
    }
`;

const LogoName = styled.div`
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.heading};
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize.base};
    }
`;

const LogoDescription = styled.div`
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.textLight};
    text-align: center;
    line-height: 1.4;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize.xs};
    }
`;

const clients = [{
  name: 'Maison Dellos', description: 'Рестораны, сеть «МуМу»', logo: '/images/clients/maison-dellos.svg', hasLogo: true,
}, {
  name: 'ВсеИнструменты.Ру', description: 'Розничная сеть', hasLogo: false,
}, {
  name: 'Хадасса Медикал', description: 'Медицинский центр', hasLogo: false,
}, {
  name: 'Сеть «Штолле»', description: 'Кафе-пекарни', hasLogo: false,
}, {
  name: 'Сеть «PIMS»', description: 'Кофейни', hasLogo: false,
}, {
  name: 'Школы Москвы', description: 'Образовательные учреждения', hasLogo: false,
}];

export default function Clients() {
  // Дублируем массив для бесконечного эффекта
  const doubledClients = [...clients, ...clients];

  return (<ClientsSection>
      <Container>
        <SectionHeader>
          <SectionTitle>
            Нам <span>доверяют</span>
          </SectionTitle>
          <SectionDescription>
            Крупнейшие компании и государственные учреждения выбирают нас
          </SectionDescription>
        </SectionHeader>
      </Container>

      <SliderWrapper>
        <SliderContainer>
          <SliderTrack>
            {doubledClients.map((client, index) => (<LogoCard key={index}>
                <LogoWrapper>
                  {client.hasLogo ? (<LogoImage src={client.logo} alt={client.name} />) : (<LogoPlaceholder>{client.name.substring(0, 3)}</LogoPlaceholder>)}
                </LogoWrapper>
                <LogoName>{client.name}</LogoName>
                <LogoDescription>{client.description}</LogoDescription>
              </LogoCard>))}
          </SliderTrack>
        </SliderContainer>
      </SliderWrapper>
    </ClientsSection>);
}
