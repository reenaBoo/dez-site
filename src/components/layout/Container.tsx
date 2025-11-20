'use client'

import styled from 'styled-components'

interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: boolean
}

const StyledContainer = styled.div<ContainerProps>`
  width: 100%;
  margin: 0 auto;
  padding-left: ${({ theme, padding }) => padding !== false ? theme.spacing.lg : 0};
  padding-right: ${({ theme, padding }) => padding !== false ? theme.spacing.lg : 0};
  
  max-width: ${({ maxWidth }) => {
  switch (maxWidth) {
    case 'sm': return '640px'
    case 'md': return '768px'
    case 'lg': return '1024px'
    case 'xl': return '1280px'
    case 'full': return '100%'
    default: return '1200px'
  }
}};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: ${({ theme, padding }) => padding !== false ? theme.spacing.md : 0};
    padding-right: ${({ theme, padding }) => padding !== false ? theme.spacing.md : 0};
  }
`

interface Props extends ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({
  children,
  maxWidth,
  padding,
  className
}: Props) {
  return (
    <StyledContainer
      maxWidth={maxWidth}
      padding={padding}
      className={className}
    >
      {children}
    </StyledContainer>
  )
}
