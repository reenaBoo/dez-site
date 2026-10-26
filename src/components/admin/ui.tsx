'use client';

import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';

// Базовые элементы админки: та же тема, что у сайта, но плотнее и без эффектов

export const AdminPage = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9375rem;
`;

export const Panel = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.navy};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const PanelTitle = styled.h2`
  font-size: 0.75rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: 500;
`;

const control = css`
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.heading};
  font: inherit;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(217, 177, 95, 0.15);
  }

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.error};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
    opacity: 0.7;
  }
`;

export const Input = styled.input`${control}`;
export const Textarea = styled.textarea`
  ${control}
  resize: vertical;
  min-height: 80px;
  line-height: 1.55;
`;
export const Select = styled.select`
  ${control}
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #85827A 50%), linear-gradient(135deg, #85827A 50%, transparent 50%);
  background-position: calc(100% - 16px) 50%, calc(100% - 11px) 50%;
  background-size: 5px 5px;
  background-repeat: no-repeat;
  padding-right: 2rem;
`;

const FieldWrap = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  & + & { margin-top: ${({ theme }) => theme.spacing.md}; }

  .label {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  .hint {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textLight};
  }

  .error {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.error};
  }
`;

const Counter = styled.span<{ $state: 'ok' | 'warn' | 'bad' }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: 400;
  font-size: 0.75rem;
  color: ${({ theme, $state }) => ($state === 'ok' ? theme.colors.success : $state === 'warn' ? theme.colors.warning : theme.colors.error)};
`;

interface FieldProps {
  label: string;
  hint?: ReactNode;
  error?: string;
  counter?: { length: number; min?: number; max: number };
  children: ReactNode;
  as?: 'label' | 'div';
}

export function Field({ label, hint, error, counter, children, as }: FieldProps) {
  let state: 'ok' | 'warn' | 'bad' = 'ok';
  if (counter) {
    if (counter.length > counter.max) state = 'bad';
    else if (counter.min && counter.length < counter.min) state = 'warn';
  }
  return (
    <FieldWrap as={as}>
      <span className='label'>
        {label}
        {counter && <Counter $state={state}>{counter.length} / {counter.max}</Counter>}
      </span>
      {children}
      {error ? <span className='error' role='alert'>{error}</span> : hint && <span className='hint'>{hint}</span>}
    </FieldWrap>
  );
}

export const Button = styled.button<{ $variant?: 'primary' | 'ghost' | 'danger' | 'subtle'; $size?: 'sm' | 'md' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: ${({ $size }) => ($size === 'sm' ? '0.4rem 0.7rem' : '0.62rem 1.05rem')};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid transparent;
  font-size: ${({ $size }) => ($size === 'sm' ? '0.8125rem' : '0.875rem')};
  font-weight: 600;
  white-space: nowrap;
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  ${({ $variant = 'ghost', theme }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background: ${theme.colors.primary};
          color: ${theme.colors.background};
          &:hover:not(:disabled) { background: ${theme.colors.primaryLight}; }
        `;
      case 'danger':
        return css`
          background: transparent;
          color: ${theme.colors.error};
          border-color: rgba(239, 68, 68, 0.4);
          &:hover:not(:disabled) { background: rgba(239, 68, 68, 0.1); }
        `;
      case 'subtle':
        return css`
          background: transparent;
          color: ${theme.colors.textLight};
          &:hover:not(:disabled) { color: ${theme.colors.heading}; background: ${theme.colors.navyLight}; }
        `;
      default:
        return css`
          background: transparent;
          color: ${theme.colors.heading};
          border-color: ${theme.colors.border};
          &:hover:not(:disabled) { border-color: ${theme.colors.primary}; color: ${theme.colors.primary}; }
        `;
    }
  }}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryLight};
    outline-offset: 2px;
  }

  &:disabled { opacity: 0.45; cursor: not-allowed; }
`;

export const IconButton = styled(Button).attrs({ $variant: 'subtle', $size: 'sm' })`
  padding: 0.35rem;
`;

export const Badge = styled.span<{ $tone?: 'draft' | 'published' | 'scheduled' | 'neutral' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.18rem 0.55rem;
  border-radius: 999px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid;

  ${({ $tone = 'neutral', theme }) => {
    if ($tone === 'published') return css`color: ${theme.colors.success}; border-color: rgba(143, 181, 115, 0.45); background: rgba(143, 181, 115, 0.08);`;
    if ($tone === 'scheduled') return css`color: #8FB3E0; border-color: rgba(143, 179, 224, 0.45); background: rgba(143, 179, 224, 0.08);`;
    if ($tone === 'draft') return css`color: ${theme.colors.textLight}; border-color: ${theme.colors.border};`;
    return css`color: ${theme.colors.primary}; border-color: rgba(217, 177, 95, 0.4);`;
  }}
`;

// Переключатель вариантов (сегменты)
const SegmentedRoot = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 2px;
  padding: 2px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};

  button {
    padding: 0.35rem 0.6rem;
    border-radius: 3px;
    background: transparent;
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 0.8125rem;
    transition: all ${({ theme }) => theme.transitions.fast};

    &[aria-pressed='true'] {
      background: ${({ theme }) => theme.colors.navyLight};
      color: ${({ theme }) => theme.colors.primary};
    }

    &:hover { color: ${({ theme }) => theme.colors.heading}; }
    &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.primaryLight}; }
  }
`;

interface SegmentedProps<T extends string> {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  label?: string;
}

export function Segmented<T extends string>({ value, options, onChange, label }: SegmentedProps<T>) {
  return (
    <SegmentedRoot role='group' aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type='button' aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </SegmentedRoot>
  );
}

const ToggleRoot = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  font-size: 0.875rem;

  & + & { margin-top: ${({ theme }) => theme.spacing.sm}; }

  input {
    appearance: none;
    flex-shrink: 0;
    width: 36px;
    height: 20px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.navyLight};
    border: 1px solid ${({ theme }) => theme.colors.border};
    position: relative;
    cursor: pointer;
    transition: background ${({ theme }) => theme.transitions.fast};

    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.textLight};
      transition: transform ${({ theme }) => theme.transitions.fast}, background ${({ theme }) => theme.transitions.fast};
    }

    &:checked { background: rgba(217, 177, 95, 0.3); border-color: ${({ theme }) => theme.colors.primary}; }
    &:checked::after { transform: translateX(16px); background: ${({ theme }) => theme.colors.primary}; }
    &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.primaryLight}; outline-offset: 2px; }
  }
`;

export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <ToggleRoot>
      <span>{label}</span>
      <input type='checkbox' checked={checked} onChange={(e) => onChange(e.target.checked)}/>
    </ToggleRoot>
  );
}

export const Row = styled.div<{ $gap?: string; $wrap?: boolean; $justify?: string }>`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap ?? '0.5rem'};
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : 'nowrap')};
  justify-content: ${({ $justify }) => $justify ?? 'flex-start'};
`;

export const Muted = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.8125rem;
`;
