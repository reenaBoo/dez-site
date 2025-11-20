'use client'

import styled from 'styled-components'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export const Button = styled.button<ButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
    font-family: ${({ theme }) => theme.fontFamily};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.normal};
    border: 2px solid transparent;
    text-decoration: none;

    padding: ${({ theme, size }) => {
        switch (size) {
            case 'sm': return `${theme.spacing.sm} ${theme.spacing.md}`
            case 'lg': return `${theme.spacing.lg} ${theme.spacing.xl}`
            default: return `${theme.spacing.md} ${theme.spacing.lg}`
        }
    }};

    font-size: ${({ theme, size }) => {
        switch (size) {
            case 'sm': return theme.fontSize.sm
            case 'lg': return theme.fontSize.lg
            default: return theme.fontSize.base
        }
    }};

    ${({ theme, variant, disabled }) => {
        if (disabled) {
            return `
        background-color: ${theme.colors.border};
        color: ${theme.colors.textLight};
        cursor: not-allowed;
        opacity: 0.6;
      `
        }

        switch (variant) {
            case 'secondary':
                return `
          background-color: ${theme.colors.secondary};
          color: white;
          &:hover {
            background-color: #059669;
            box-shadow: ${theme.shadows.md};
          }
        `
            case 'outline':
                return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
          &:hover {
            background-color: ${theme.colors.primary};
            color: white;
          }
        `
            default:
                return `
          background-color: ${theme.colors.primary};
          color: white;
          &:hover {
            background-color: ${theme.colors.primaryDark};
            box-shadow: ${theme.shadows.md};
            transform: translateY(-2px);
          }
        `
        }
    }}

    &:active {
        transform: translateY(0);
    }
`
