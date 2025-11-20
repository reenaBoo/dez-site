// src/components/sections/Prices.tsx
'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Container from '@/components/layout/Container'

const PricesSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xxxl} 0;
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
`

const SectionTitle = styled.h2`
    font-size: ${({ theme }) => theme.fontSize['4xl']};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.heading};
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.md};

    span {
        color: ${({ theme }) => theme.colors.primary};
    }
`

const SectionDescription = styled.p`
    font-size: ${({ theme }) => theme.fontSize.lg};
    color: ${({ theme }) => theme.colors.textLight};
    text-align: center;
    max-width: 600px;
    margin: 0 auto ${({ theme }) => theme.spacing.xxxl};
`

const PriceTable = styled.div`
    overflow-x: auto;
`

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadows.md};
`

const TableHead = styled.thead`
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
`

const TableRow = styled.tr`
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.backgroundAlt};
    }
`

const TableHeader = styled.th`
    padding: ${({ theme }) => theme.spacing.lg};
    text-align: left;
    font-weight: ${({ theme }) => theme.fontWeight.semibold};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.md};
        font-size: ${({ theme }) => theme.fontSize.sm};
    }
`

const TableCell = styled.td`
    padding: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.md};
        font-size: ${({ theme }) => theme.fontSize.sm};
    }
`

const PriceCell = styled(TableCell)`
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSize.xl};
`

const priceData = [
  {
    service: 'Уничтожение клопов',
    apartment1: '2 500 ₽',
    apartment2: '3 000 ₽',
    apartment3: '3 500 ₽',
    house: 'от 5 000 ₽',
  },
  {
    service: 'Уничтожение тараканов',
    apartment1: '2 000 ₽',
    apartment2: '2 500 ₽',
    apartment3: '3 000 ₽',
    house: 'от 4 000 ₽',
  },
  {
    service: 'Дератизация',
    apartment1: '3 000 ₽',
    apartment2: '3 500 ₽',
    apartment3: '4 000 ₽',
    house: 'от 6 000 ₽',
  },
  {
    service: 'Дезинфекция',
    apartment1: '2 500 ₽',
    apartment2: '3 000 ₽',
    apartment3: '3 500 ₽',
    house: 'от 5 000 ₽',
  },
  {
    service: 'Обработка от клещей',
    apartment1: '—',
    apartment2: '—',
    apartment3: '—',
    house: 'от 3 000 ₽',
  },
]

export default function Prices() {
  return (
    <PricesSection id="prices">
      <Container>
        <SectionTitle>
          <span>Цены</span> на услуги
        </SectionTitle>
        <SectionDescription>
          Стоимость зависит от площади помещения и степени заражения.
          Точную цену озвучим после осмотра.
        </SectionDescription>

        <PriceTable>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Услуга</TableHeader>
                <TableHeader>1-комн.</TableHeader>
                <TableHeader>2-комн.</TableHeader>
                <TableHeader>3-комн.</TableHeader>
                <TableHeader>Дом</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
            {priceData.map((row, index) => (
              <TableRow
                as={motion.tr}
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TableCell>{row.service}</TableCell>
                <PriceCell>{row.apartment1}</PriceCell>
                <PriceCell>{row.apartment2}</PriceCell>
                <PriceCell>{row.apartment3}</PriceCell>
                <PriceCell>{row.house}</PriceCell>
              </TableRow>
            ))}
            </tbody>
          </Table>
        </PriceTable>
      </Container>
    </PricesSection>
  )
}
