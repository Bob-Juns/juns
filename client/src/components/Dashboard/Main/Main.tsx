import React from 'react';

import styled from 'styled-components';

import MainCount from '@components/Dashboard/Main/MainCount';

const Main = () => {
  return (
    <Container>
      <MainCount />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default Main;
