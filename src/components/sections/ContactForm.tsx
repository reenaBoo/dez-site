'use client'

import styled from 'styled-components'
import Container from '@/components/layout/Container'

const FormSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.heading};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xxl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Label = styled.label`
  display: block;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.base};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.base};
  background-color: ${({ theme }) => theme.colors.background};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Форма отправлена!')
  }

  return (
    <FormSection id="contact-form">
      <Container>
        <img src="/images/test3.svg" alt="Иконка" />
        <SectionTitle>Оставить заявку</SectionTitle>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Ваше имя</Label>
            <Input
              id="name"
              type="text"
              placeholder="Иван Иванов"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (495) 956‑48‑55"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="service">Услуга</Label>
            <Select id="service" required>
              <option value="">Выберите услугу</option>
              <option value="bedbugs">Уничтожение клопов</option>
              <option value="cockroaches">Уничтожение тараканов</option>
              <option value="rodents">Дератизация</option>
              <option value="disinfection">Дезинфекция</option>
            </Select>
          </FormGroup>

          <SubmitButton type="submit">
            Отправить заявку
          </SubmitButton>
        </Form>
      </Container>
    </FormSection>
  )
}
