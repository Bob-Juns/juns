import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '@components/Common/Header/Header';

type Props = {
  location?: string;
  children: React.ReactNode;
};

const Page = ({ location = 'default', children }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header location={location} />
      <Body location={location}>{children}</Body>
    </>
  );
};

const Body = styled.div<{ location: string }>`
  width: 100vw;
  ${(props) =>
    props.location === 'dashboard' || props.location === 'channels'
      ? `
    min-height: calc(100vh - 6.75rem);
    min-height: calc(var(--vh, 1vh) * 100 - 6.75rem);
    margin-top: 3.75rem;
    padding: 1rem 0.5rem;

    background-color: ${props.theme.color.gray.light};
    overflow-x: hidden;
  `
      : props.location === 'detail'
      ? `min-height: calc(100vh - 3.75rem);
      min-height: calc(var(--vh, 1vh) * 100 - 3.75rem);
      margin-top: 3.75rem;
      background-color: ${props.theme.color.gray.light};`
      : `
  min-height: calc(100vh - 3.75rem);
  min-height: calc(var(--vh, 1vh) * 100 - 3.75rem);
  margin-top: 4.75rem;

  position: relative;
  background-color: #fff;
  overflow-x: hidden;
  `}
`;

export default Page;
