'use client';

import styled from 'styled-components';
import Container from '@/components/layout/Container';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ClientsSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xxxl} 0;
    background-color: ${({ theme }) => theme.colors.background};
    overflow: hidden;
    position: relative;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.xl} 0;
    }
`;

const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xl};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-bottom: ${({ theme }) => theme.spacing.lg};
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

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize['2xl']};
    }
`;

const SectionDescription = styled.p`
    font-size: ${({ theme }) => theme.fontSize.lg};
    color: ${({ theme }) => theme.colors.textLight};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.base};
    }
`;

const SliderWrapper = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
    padding: ${({ theme }) => theme.spacing.xl} 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0;
    }
`;

const SliderContainer = styled.div`
    overflow: visible;
    padding: 0;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const SliderTrack = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.lg};
    animation: scroll 40s linear infinite;
    width: fit-content;
    padding: ${({ theme }) => theme.spacing.md} 0;

    &:hover {
        animation-play-state: paused;
    }

    @keyframes scroll {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        animation: scroll 30s linear infinite;
    }
`;

const LogoCard = styled.div`
    flex: 0 0 auto;
    width: 280px;
    background-color: ${({ theme }) => theme.colors.navy};
    border: 2px solid ${({ theme }) => theme.colors.navyLight};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing.lg};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
    transition: all ${({ theme }) => theme.transitions.normal};
    height: 220px;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: ${({ theme }) => theme.shadows.glow};
        transform: translateY(-12px);
        z-index: 10;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        width: 240px;
        height: 180px;
        padding: ${({ theme }) => theme.spacing.md};
        gap: ${({ theme }) => theme.spacing.xs};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 200px;
        height: 140px;
        padding: ${({ theme }) => theme.spacing.sm};

        &:hover {
            transform: translateY(-8px);
        }
    }
`;

const LogoWrapper = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.sm};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        height: 80px;
        margin-bottom: ${({ theme }) => theme.spacing.xs};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        height: 60px;
        margin-bottom: ${({ theme }) => theme.spacing.xs};
    }
`;

const LogoImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    mix-blend-mode: screen;
    opacity: 0.9;
    transition: all ${({ theme }) => theme.transitions.fast};

    ${LogoCard}:hover & {
        opacity: 1;
        filter: drop-shadow(0 0 8px ${({ theme }) => theme.colors.primary});
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

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize['2xl']};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.xl};
    }
`;

const LogoName = styled.div`
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.heading};
    text-align: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize.base};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.sm};
    }
`;

const LogoDescription = styled.div`
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.textLight};
    text-align: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize.xs};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.xs};
        display: none;
    }
`;

const ViewAllButton = styled(Link)`
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
    margin-top: ${({ theme }) => theme.spacing.lg};

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.navy};
        transform: translateY(-2px);
        box-shadow: ${({ theme }) => theme.shadows.glow};
    }

    svg {
        flex-shrink: 0;
        transition: transform ${({ theme }) => theme.transitions.fast};
    }

    &:hover svg {
        transform: translateX(4px);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.sm};
        padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
        margin-top: 0;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-top: ${({ theme }) => theme.spacing.lg};
    }
`;

const clients = [{
  name: 'Сеть «МуМу»', description: 'Сеть ресторанов', logo: '/images/clients/mumu.png', hasLogo: true,
}, {
  name: 'ВсеИнструменты.Ру', description: 'Розничная сеть', logo: '/images/clients/vseinstr.png', hasLogo: true,
}, {
  name: 'Сеть «Штолле»', description: 'Кафе-пекарни', logo: '/images/clients/shtolle.png', hasLogo: true,
}, {
  name: 'Сеть «PIMS»', description: 'Кофейни', logo: '/images/clients/pims.png', hasLogo: true,
}, {
  name: 'Школы Москвы', description: 'Образовательные учреждения', logo: '/images/clients/schools.png', hasLogo: true,
}, {
  name: 'Министерство обороны', description: 'Объекты Минобороны РФ', logo: '/images/clients/minobr.png', hasLogo: true,
}, {
  name: 'Сеть «Бетховен»', description: 'Зоомагазины', logo: '/images/clients/bethoven.png', hasLogo: true,
}, {
  name: 'Аэропорт «Жуковский»', description: 'Международный аэропорт', logo: '/images/clients/zhukovskiy.png', hasLogo: true,
}, {
  name: 'ООО «СИМПЛ ФУД»', description: 'Кейтеринговая компания', logo: '/images/clients/simple-food.png', hasLogo: true,
}];

export default function Clients() {
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

    <Container>
      <ButtonWrapper>
        <ViewAllButton href='/about#clients'>
          Посмотреть список клиентов
          <ArrowRight size={20} />
        </ViewAllButton>
      </ButtonWrapper>
    </Container>
  </ClientsSection>);
}
