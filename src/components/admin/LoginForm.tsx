'use client';

import { useActionState } from 'react';
import styled from 'styled-components';
import { Lock } from 'lucide-react';
import { loginAction, type LoginState } from '@/app/admin/actions';
import { AdminPage, Button, Field, Input, Panel } from './ui';

const Center = styled(AdminPage)`
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background:
    radial-gradient(50% 40% at 50% 30%, rgba(217, 177, 95, 0.08), transparent 70%),
    ${({ theme }) => theme.colors.background};
`;

const Card = styled(Panel)`
  width: min(400px, 100%);
  padding: ${({ theme }) => theme.spacing.xl};

  h1 {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.35rem;
    margin-bottom: ${({ theme }) => theme.spacing.xl};

    svg { color: ${({ theme }) => theme.colors.primary}; }
    span { color: ${({ theme }) => theme.colors.primary}; }
  }

  form > button { width: 100%; margin-top: ${({ theme }) => theme.spacing.lg}; }
`;

const ErrorText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
`;

export default function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {});

  return (
    <Center>
      <Card>
        <h1><Lock size={20}/> НПП <span>«Биохиммаш»</span></h1>
        <form action={action}>
          <input type='hidden' name='next' value={next ?? ''}/>
          <Field label='Логин'>
            <Input name='login' autoComplete='username' required autoFocus/>
          </Field>
          <Field label='Пароль'>
            <Input name='password' type='password' autoComplete='current-password' required/>
          </Field>
          <Button $variant='primary' type='submit' disabled={pending}>{pending ? 'Входим…' : 'Войти'}</Button>
          {state.error && <ErrorText role='alert'>{state.error}</ErrorText>}
        </form>
      </Card>
    </Center>
  );
}
