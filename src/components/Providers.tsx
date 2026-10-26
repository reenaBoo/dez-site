'use client';

import { ThemeProvider } from 'styled-components';
import { MotionConfig } from 'framer-motion';
import StyledComponentsRegistry from '@/lib/registry';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { theme } from '@/styles/theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyles/>
        {/* Анимации framer-motion учитывают системную настройку «уменьшить движение» */}
        <MotionConfig reducedMotion='user'>
          {children}
        </MotionConfig>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
