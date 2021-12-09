import React from 'react';
import styled from 'styled-components';
import Count from './MainCount';
const Main = () => {
  return (
    <Container>
      <Count />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
export default Main;
