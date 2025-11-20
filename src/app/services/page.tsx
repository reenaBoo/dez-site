'use client'

import Services from '@/components/sections/Services'
import styled from 'styled-components'

const PageWrapper = styled.div`
  min-height: 60vh;
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
`

export default function ServicesPage() {
  return (
    <PageWrapper>
      <Services />
    </PageWrapper>
  )
}
