'use client';

import styled from 'styled-components';
import { ArrowUpRight, MapPin } from 'lucide-react';
import Container from '@/components/layout/Container';
import Image from 'next/image';

export const SPONSORED_PROJECT = {
  name: 'Сделано в Жуковском',
  url: 'https://xn--80aeaffi2abdqfandc8am6a.xn--p1ai/',
  displayUrl: 'сделанновжуковском.рф',
  logo: '/images/sdelano-v-zhukovskom.png' as string | null,
  logoWidth: 666,
  logoHeight: 168,
};

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.xl} 0;
  }
`;

const Card = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xxl};
  padding: ${({ theme }) => theme.spacing.xxl};
  background: radial-gradient(120% 140% at 100% 0%, rgba(217, 177, 95, 0.10) 0%, transparent 55%),
  ${({ theme }) => theme.colors.navy};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, ${({ theme }) => theme.colors.primaryLight}, ${({ theme }) => theme.colors.primaryDark});
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
    padding: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const Label = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 2.8vw, 2.25rem);
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Text = styled.p`
  max-width: 60ch;
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.base};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 14px 26px;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid rgba(217, 177, 95, 0.55);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.normal};

  svg {
    flex-shrink: 0;
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.navy};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  &:hover svg {
    transform: translate(2px, -2px);
  }
`;

const Badge = styled.a`
  width: 320px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.navyDark};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  img {
    width: 100%;
    max-width: 260px;
    height: auto;
    object-fit: contain;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    min-height: 140px;
  }
`;

const Wordmark = styled.div`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.heading};

  span {
    display: block;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BadgeCaption = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textLight};
`;

type PartnershipCardProps = {
  showLabel?: boolean;
  headingAs?: 'h2' | 'h3';
  titleId?: string;
};

export function PartnershipCard({ showLabel = true, headingAs = 'h2', titleId }: PartnershipCardProps) {
  const { name, url, displayUrl, logo, logoWidth, logoHeight } = SPONSORED_PROJECT;

  return (
    <Card>
      <div>
        {showLabel && (
          <Label>
            <MapPin size={14}/>
            Поддерживаем свой город
          </Label>
        )}
        <Title as={headingAs} id={titleId}>
          НПП «Биохиммаш» - генеральный партнёр проекта <span>«{name}»</span>
        </Title>
        <Text>
          Мы поддерживаем инициативу, объединяющую предприятия, научные организации и предпринимателей наукограда,
          способствуем развитию делового сообщества и продвижению российских компаний.
        </Text>
        <ProjectLink href={url} target='_blank' rel='noopener'>
          О проекте «Сделано в Жуковском»
          <ArrowUpRight size={18}/>
        </ProjectLink>
      </div>

      <Badge href={url} target='_blank' rel='noopener' aria-label={`Сайт проекта «${name}»`}>
        {logo ? (
          <Image
            src={logo}
            alt={`Логотип проекта «${name}»`}
            width={logoWidth}
            height={logoHeight}
          />
        ) : (
          <Wordmark>
            Сделано
            <span>в Жуковском</span>
          </Wordmark>
        )}
        <BadgeCaption>{displayUrl}</BadgeCaption>
      </Badge>
    </Card>
  );
}

export default function Sponsorship() {
  return (
    <Section id='sponsorship' aria-labelledby='sponsorship-title'>
      <Container>
        <PartnershipCard titleId='sponsorship-title'/>
      </Container>
    </Section>
  );
}
