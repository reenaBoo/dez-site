'use client';

import styled from 'styled-components';
import Contacts from '@/components/sections/Contacts';

const PageWrapper = styled.div`
  padding-top: 72px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

export default function ContactsPage() {
  return (
    <PageWrapper>
      <Contacts standalone/>
    </PageWrapper>
  );
}
