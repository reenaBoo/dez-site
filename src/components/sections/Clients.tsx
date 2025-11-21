'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';

const ClientsSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xxxl} 0;
    background-color: ${({ theme }) => theme.colors.background};
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

const LogosGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
    gap: ${({ theme }) => theme.spacing.xl};
    align-items: center;
    justify-content: center;
    justify-items: center;
    max-width: 900px;
    margin: 0 auto;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        grid-template-columns: repeat(2, 1fr);
        gap: ${({ theme }) => theme.spacing.lg};
        max-width: 100%;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        grid-template-columns: 1fr;
    }
`;

const LogoCard = styled(motion.div)`
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    border: 2px solid ${({ theme }) => theme.colors.navyLight};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing.lg};
    transition: all ${({ theme }) => theme.transitions.normal};
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: ${({ theme }) => theme.shadows.glow};
        transform: translateY(-4px);
    }
`;

const LogoImage = styled.img`
    width: 100%;
    height: 100%;
    max-width: 140px;
    max-height: 80px;
    object-fit: contain;
    transition: all ${({ theme }) => theme.transitions.normal};
`;

const LogoText = styled.div`
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
    line-height: 1.3;
`;

const LogoSubtext = styled.div`
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.textLight};
    font-weight: ${({ theme }) => theme.fontWeight.normal};
    margin-top: ${({ theme }) => theme.spacing.xs};
`;

const clients = [{
  name: 'Maison Dellos', description: 'Рестораны, сеть «МуМу»', logo: '/images/maison-dellos.svg', hasLogo: true,
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

      <LogosGrid>
        {clients.map((client, index) => (<LogoCard
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {client.hasLogo ? (<LogoImage src={client.logo} alt={client.name} />) : (<LogoText>
            <div>{client.name}</div>
            <LogoSubtext>{client.description}</LogoSubtext>
          </LogoText>)}
        </LogoCard>))}
      </LogosGrid>
    </Container>
  </ClientsSection>);
}
