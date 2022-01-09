import React from 'react';

import styled from 'styled-components';

const ListItemSkeleton = () => {
  return (
    <Container>
      <Image />
      <Title />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const Image = styled.div`
  width: 100%;
  height: 0;
  padding-top: 133.34%;
  margin-bottom: 0.375rem;

  background-color: ${(props) => props.theme.color.gray.base};
  box-shadow: ${(props) => props.theme.boxShadow.primary};
  border-radius: 0.375rem;
`;

const Title = styled.div`
  width: 90%;
  height: 0.625rem;
  background-color: ${(props) => props.theme.color.gray.base};
  border-radius: 0.25rem;

  ${(props) =>
    props.theme.device('tablet')(`
  height: 0.875rem;
  `)}
`;

export default ListItemSkeleton;
