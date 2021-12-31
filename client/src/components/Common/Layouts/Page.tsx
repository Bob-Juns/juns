import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '@components/Common/Header/Header';

type Props = {
  blur?: boolean;
  children: React.ReactNode;
};

const Page = ({ blur = false, children }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header blur={blur} />
      <Body>{children}</Body>
    </>
  );
};

const Body = styled.div<{ blur?: boolean }>`
  width: 100vw;
  min-height: calc(100vh - 6.75rem);
  min-height: calc(var(--vh, 1vh) * 100 - 6.75rem);
  ${(props) => props.blur && `overflow-x: hidden;`}
`;

export default Page;
