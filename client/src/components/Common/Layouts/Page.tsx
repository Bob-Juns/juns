import React from 'react';
import styled from 'styled-components';
import Header from '@components/Common/Header/Header';

type Props = {
  children: React.ReactNode;
};

const Page = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Body>{children}</Body>
    </>
  );
};

const Body = styled.section`
  width: 100vw;
  min-height: calc(100vh - 5.375rem);
  min-height: calc(var(--vh, 1vh) * 100 -5.375rem);
  margin-top: 5.375rem;
`;

export default Page;
