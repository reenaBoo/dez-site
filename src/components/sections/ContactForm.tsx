'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import Container from '@/components/layout/Container';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { IContactForm } from '@/types/IContactForm';

const FormSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xxxl} 0;
    background: linear-gradient(
            135deg,
            ${({ theme }) => theme.colors.background} 0%,
            ${({ theme }) => theme.colors.backgroundAlt} 100%
    );

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.xxl} 0;
    }
`;

const SectionTitle = styled.h2`
    font-size: ${({ theme }) => theme.fontSize['4xl']};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.heading};
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize['3xl']};
        margin-bottom: ${({ theme }) => theme.spacing.xl};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize['xl']};
        margin-bottom: ${({ theme }) => theme.spacing.lg};
    }
`;

const FormWrapper = styled.div`
    max-width: 600px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    padding: ${({ theme }) => theme.spacing.xxl};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border: 1px solid ${({ theme }) => theme.colors.border};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.xl};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.lg};
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
    min-height: 117px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        min-height: 90px;
    }
`;

const ErrorText = styled.span`
    color: ${({ theme }) => theme.colors.error};
    font-size: ${({ theme }) => theme.fontSize.sm};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.xs};
    }
`;

const Label = styled.label`
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.colors.heading};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.sm};
    }
`;

const Input = styled.input`
    padding: ${({ theme }) => theme.spacing.md};
    background-color: ${({ theme }) => theme.colors.navy};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.base};
    transition: all ${({ theme }) => theme.transitions.normal};

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 0 3px rgba(253, 185, 19, 0.1);
    }

    &::placeholder {
        color: ${({ theme }) => theme.colors.textLight};

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            font-size: ${({ theme }) => theme.fontSize.sm};
        }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.sm};
    }
`;

const Textarea = styled.textarea`
    padding: ${({ theme }) => theme.spacing.md};
    background-color: ${({ theme }) => theme.colors.navy};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.base};
    min-height: 150px;
    resize: vertical;
    font-family: inherit;
    transition: all ${({ theme }) => theme.transitions.normal};

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 0 3px rgba(253, 185, 19, 0.1);
    }

    &::placeholder {
        color: ${({ theme }) => theme.colors.textLight};

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            font-size: ${({ theme }) => theme.fontSize.sm};
        }
    }
`;

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.sm};
`;

const CheckboxInput = styled.input`
    width: 20px;
    height: 20px;
    margin-top: 2px;
    cursor: pointer;
    accent-color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
`;

const CheckboxLabel = styled.label`
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
    cursor: pointer;

    a {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: underline;
        transition: color ${({ theme }) => theme.transitions.fast};

        &:hover {
            color: ${({ theme }) => theme.colors.primaryLight};
        }
    }
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.md};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: column;
    }
`;

const SubmitButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xxl};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.navy};
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.normal};
    box-shadow: ${({ theme }) => theme.shadows.glow};
    flex: 1;

    &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.primaryLight};
        transform: translateY(-2px);
        box-shadow: 0 0 30px rgba(253, 185, 19, 0.7);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 100%;
    }
`;

const SuccessMessage = styled.div`
    padding: ${({ theme }) => theme.spacing.md};
    background-color: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: ${({ theme }) => theme.borderRadius.md};
    color: #22c55e;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    text-align: center;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const ErrorMessage = styled.div`
    padding: ${({ theme }) => theme.spacing.md};
    background-color: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: ${({ theme }) => theme.borderRadius.md};
    color: #ef4444;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    text-align: center;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default function ContactForm() {
  const {
    register, handleSubmit, formState: { errors, isValid, isSubmitting, isSubmitSuccessful }, reset, setError,
  } = useForm<IContactForm>({
    mode: 'onTouched',
  });

  useEffect(() => {
    if (isSubmitSuccessful && !errors.root) {
      const timer = setTimeout(() => {
        reset();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitSuccessful, errors.root, reset]);

  const onSubmit = async (data: IContactForm) => {
    const { name, phone, message } = data;
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: {
          'Content-Type': 'application/json',
        }, body: JSON.stringify({
          name, phone, message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        reset();
      } else {
        setError('root', {
          message: 'Ошибка отправки. Попробуйте позже или позвоните нам.',
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setError('root', {
        message: 'Ошибка отправки. Попробуйте позже или позвоните нам.',
      });
    }
  };

  return (<FormSection id='contact-form'>
    <Container>
      <SectionTitle>Оставить заявку</SectionTitle>

      <FormWrapper>
        {isSubmitSuccessful && !errors.root && (<SuccessMessage>
          ✓ Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.
        </SuccessMessage>)}

        {errors.root && (<ErrorMessage>
          ✗ {errors.root.message}
        </ErrorMessage>)}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor='name'>Ваше имя</Label>
            <Input
              id='name'
              type='text'
              placeholder='Иван Иванов'
              {...register('name', {
                required: 'Пожалуйста, укажите ваше имя', maxLength: {
                  value: 99, message: 'Имя слишком длинное',
                },
              })}
            />
            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor='phone'>Телефон/мессенджер</Label>
            <Input
              id='phone'
              type='tel'
              placeholder='+7 (___) ___-__-__'
              {...register('phone', {
                required: 'Пожалуйста, укажите телефон', validate: (value) => {
                  const digits = value.replace(/\D/g, '');
                  if (digits.length !== 11) {
                    return 'Номер должен содержать 11 цифр';
                  }
                  if (!digits.startsWith('7') && !digits.startsWith('8')) {
                    return 'Номер должен начинаться с +7 или 8';
                  }
                  return true;
                },
              })}
            />
            {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor='message'>Опишите задачу</Label>
            <Textarea
              id='message'
              placeholder='Площадь, тип объекта, вид работ, сроки...'
              {...register('message', {
                required: 'Пожалуйста, опишите задачу', maxLength: {
                  value: 999, message: 'Сообщение слишком длинное',
                },
              })}
            />
            {errors.message && <ErrorText>{errors.message.message}</ErrorText>}
          </FormGroup>

          <CheckboxWrapper>
            <CheckboxInput
              type='checkbox'
              id='consent'
              {...register('consent', {
                required: 'Необходимо согласие на обработку персональных данных',
              })}
            />
            <CheckboxLabel htmlFor='consent'>
              Я согласен с{' '}
              <Link href='/privacy'>политикой конфиденциальности</Link> и даю
              согласие на обработку персональных данных
            </CheckboxLabel>
          </CheckboxWrapper>

          <ButtonsWrapper>
            <SubmitButton type='submit' disabled={!isValid}>
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </SubmitButton>
          </ButtonsWrapper>
        </Form>
      </FormWrapper>
    </Container>
  </FormSection>);
}
