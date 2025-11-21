'use client';

import styled from 'styled-components';
import { Send } from 'lucide-react';
import Container from '@/components/layout/Container';

const FormSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xxxl} 0;
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

const SectionTitle = styled.h2`
    font-size: ${({ theme }) => theme.fontSize['4xl']};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.heading};
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FormWrapper = styled.div`
    max-width: 600px;
    margin: 0 auto;
`;

const Form = styled.form`
    background-color: ${({ theme }) => theme.colors.navy};
    padding: ${({ theme }) => theme.spacing.xxl};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    border: 2px solid ${({ theme }) => theme.colors.navyLight};
    box-shadow: ${({ theme }) => theme.shadows.lg};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.xl};
    }
`;

const FormGroup = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
    display: block;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.colors.heading};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSize.base};
`;

const Input = styled.input`
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    border: 2px solid ${({ theme }) => theme.colors.navyLight};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.fontSize.base};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: all ${({ theme }) => theme.transitions.fast};

    &::placeholder {
        color: ${({ theme }) => theme.colors.textLight};
    }

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: ${({ theme }) => theme.shadows.glow};
    }
`;

const Textarea = styled.textarea`
    width: 100%;
    min-height: 120px;
    padding: ${({ theme }) => theme.spacing.md};
    border: 2px solid ${({ theme }) => theme.colors.navyLight};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.fontSize.base};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: inherit;
    resize: vertical;
    transition: all ${({ theme }) => theme.transitions.fast};

    &::placeholder {
        color: ${({ theme }) => theme.colors.textLight};
    }

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: ${({ theme }) => theme.shadows.glow};
    }
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.xl};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: column;
    }
`;

const SubmitButton = styled.button`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.lg};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.navy};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.normal};
    box-shadow: ${({ theme }) => theme.shadows.glow};

    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryLight};
        transform: translateY(-2px);
        box-shadow: 0 0 30px rgba(253, 185, 19, 0.7);
    }

    &:active {
        transform: translateY(0);
    }
`;

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (<FormSection id='contact-form'>
    <Container>
      <SectionTitle>Оставить заявку</SectionTitle>

      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor='name'>Ваше имя</Label>
            <Input
              id='name'
              type='text'
              placeholder='Иван Иванов'
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor='phone'>Телефон/мессенджер</Label>
            <Input
              id='phone'
              type='tel'
              placeholder='+7 (___) ___-__-__'
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor='message'>Опишите задачу</Label>
            <Textarea
              id='message'
              placeholder='Площадь, тип объекта, вид работ, сроки...'
              required
            />
          </FormGroup>

          <ButtonsWrapper>
            <SubmitButton type='submit'>
              <Send size={20} />
              Отправить
            </SubmitButton>

          </ButtonsWrapper>
        </Form>
      </FormWrapper>
    </Container>
  </FormSection>);
}
