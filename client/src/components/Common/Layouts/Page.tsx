import React from 'react';
import styled from 'styled-components';
import Header from '@components/Common/Header/Header';

type Props = {
  dashboard?: boolean;
  children: React.ReactNode;
};

const Page = ({ dashboard = false, children }: Props) => {
  return (
    <>
      <Header dashboard={dashboard} />
      <Body dashboard={dashboard}>{children}</Body>
    </>
  );
};

const Body = styled.div<{ dashboard: boolean }>`
  width: 100vw;
  padding: 1rem 0.5rem;
  ${(props) =>
    props.dashboard
      ? `
    min-height: calc(100vh - 6.75rem);
    min-height: calc(var(--vh, 1vh) * 100 - 6.75rem);
    margin-top: 6.75rem;
    background-color: ${props.theme.color.gray.light};
  `
      : `
  min-height: calc(100vh - 3.75rem);
  min-height: calc(var(--vh, 1vh) * 100 - 3.75rem);
  margin-top: 3.75rem;
  background-color: #fff;
  `}
`;

export default Page;
