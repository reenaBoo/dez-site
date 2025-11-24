'use client';

import { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { Send } from 'lucide-react';
import Container from '@/components/layout/Container';
import Link from 'next/link';

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
    gap: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
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

const ErrorText = styled.span`
    color: ${({ theme }) => theme.colors.error};
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-top: ${({ theme }) => theme.spacing.xs};
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
  const [formData, setFormData] = useState({
    name: '', phone: '', message: '', consent: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Пожалуйста, укажите телефон';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Пожалуйста, опишите задачу';
    }

    if (!formData.consent) {
      newErrors.consent = 'Необходимо согласие на обработку персональных данных';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Отправка
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: {
          'Content-Type': 'application/json',
        }, body: JSON.stringify({
          name: formData.name, phone: formData.phone, message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');

        // Очищаем форму
        setFormData({
          name: '', phone: '', message: '', consent: false,
        });

        // Скрыть сообщение об успехе через 10 секунд
        setTimeout(() => setSubmitStatus('idle'), 10000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev, [id]: type === 'checkbox' ? checked : value,
    }));

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  return (<FormSection id='contact-form'>
    <Container>
      <SectionTitle>Оставить заявку</SectionTitle>

      <FormWrapper>
        {submitStatus === 'success' && (<SuccessMessage>
          ✓ Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.
        </SuccessMessage>)}

        {submitStatus === 'error' && (<ErrorMessage>
          ✗ Произошла ошибка при отправке. Пожалуйста, попробуйте позже или позвоните нам по телефону.
        </ErrorMessage>)}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor='name'>Ваше имя</Label>
            <Input
              id='name'
              type='text'
              placeholder='Иван Иванов'
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor='phone'>Телефон/мессенджер</Label>
            <Input
              id='phone'
              type='tel'
              placeholder='+7 (___) ___-__-__'
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor='message'>Опишите задачу</Label>
            <Textarea
              id='message'
              placeholder='Площадь, тип объекта, вид работ, сроки...'
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <ErrorText>{errors.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <CheckboxWrapper>
              <CheckboxInput
                type='checkbox'
                id='consent'
                checked={formData.consent}
                onChange={handleChange}
              />
              <CheckboxLabel htmlFor='consent'>
                Я согласен с{' '}
                <Link href='/privacy'>политикой конфиденциальности</Link> и даю
                согласие на обработку персональных данных
              </CheckboxLabel>
            </CheckboxWrapper>
            {errors.consent && <ErrorText>{errors.consent}</ErrorText>}
          </FormGroup>

          <ButtonsWrapper>
            <SubmitButton type='submit' disabled={!formData.consent || isSubmitting}>
              <Send size={20} />
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </SubmitButton>
          </ButtonsWrapper>
        </Form>
      </FormWrapper>
    </Container>
  </FormSection>);
}
