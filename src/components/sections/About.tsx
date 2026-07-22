'use client';

import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Award, Shield, Users, TrendingUp } from 'lucide-react';
import Container from '@/components/layout/Container';
import { useLazyVideo } from '@/hooks/useLazyVideo';

const AboutSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxl} 0;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing.xxxl};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;

const TextContent = styled.div``;

const SectionLabel = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4.2vw, 3.4rem);
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  .highlight {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Description = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  strong {
    color: ${({ theme }) => theme.colors.heading};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const Subtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  padding-left: ${({ theme }) => theme.spacing.lg};
  border-left: 2px solid rgba(217, 177, 95, 0.5);
`;

const StatsArea = styled.div`
  position: relative;
`;

const AmbientVideo = styled.video`
  position: absolute;
  inset: -5%;
  width: 110%;
  height: 110%;
  object-fit: cover;
  opacity: 0.3;
  mix-blend-mode: screen;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const StatsGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const sweep = keyframes`
  0% { transform: translateX(-130%) skewX(-14deg); }
  55% { transform: translateX(130%) skewX(-14deg); }
  100% { transform: translateX(130%) skewX(-14deg); }
`;

const StatCard = styled(motion.div)<{ $delay: number }>`
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background:
    linear-gradient(160deg, rgba(217, 177, 95, 0.05) 0%, transparent 40%),
    rgba(18, 18, 22, 0.72);
  padding: ${({ theme }) => theme.spacing.xl};
  transition: border-color ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: rgba(217, 177, 95, 0.5);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      100deg,
      transparent 30%,
      rgba(242, 212, 139, 0.09) 50%,
      transparent 70%
    );
    animation: ${sweep} 7s ease-in-out infinite;
    animation-delay: ${({ $delay }) => $delay}s;
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(217, 177, 95, 0.45);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 36px;
    height: 36px;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-shadow: 0 0 24px rgba(217, 177, 95, 0.4);
`;

const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.625rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLight};
`;

const stats = [{
  icon: Award, number: '2002', label: 'Год основания',
}, {
  icon: Shield, number: '100%', label: 'Гарантия результата',
}, {
  icon: Users, number: '500+', label: 'Довольных клиентов',
}, {
  icon: TrendingUp, number: '20+', label: 'Лет опыта',
}];

export default function About() {
  const videoRef = useLazyVideo('/videos/cards-loop.mp4');

  return (
    <AboutSection>
      <Container>
        <ContentWrapper>
          <TextContent>
            <SectionLabel
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              01 / О компании
            </SectionLabel>

            <Title
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Профессиональная <span className='highlight'>дезинсекция</span> и санитарная
              безопасность для бизнеса
            </Title>

            <Description
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Профессиональная <strong>дезинсекция</strong> (уничтожение насекомых),{' '}
              <strong>дератизация</strong> (уничтожение грызунов),
              <strong> дезинфекция</strong> и фитосанитарная обработка для бизнеса.
            </Description>

            <Subtitle
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Более 20 лет обеспечиваем санитарную безопасность для бизнеса и госучреждений. Работаем строго по нормам
              СанПиН, используя современные методы и
              сертифицированные препараты. Гарантируем качество, полное документальное сопровождение, конфиденциальность
              и индивидуальный подход. Выполняем работы
              в удобное для вас время, включая срочные выезды. <br/> ООО «НПП «Биохиммаш» — ваш профессиональный щит от
              санитарных рисков.
            </Subtitle>
          </TextContent>

          <StatsArea>
            <AmbientVideo ref={videoRef} muted loop playsInline preload='none'/>
            <StatsGrid>
            {stats.map((stat, index) => (<StatCard
              key={index}
              $delay={index * 0.9}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <StatIcon>
                <stat.icon size={22}/>
              </StatIcon>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>))}
            </StatsGrid>
          </StatsArea>
        </ContentWrapper>
      </Container>
    </AboutSection>
  );
}
