import React from 'react';

import styled from 'styled-components';
import Page from '@components/Common/Layouts/Page';

const Home = () => {
  return (
    <Page>
      <Container></Container>
    </Page>
  );
};

const Container = styled.section`
  width: 100vw;
  height: calc(100vh - 5.375rem);
  height: calc(var(--vh, 1vh) * 100 - 5.375rem);
`;

export default Home;
