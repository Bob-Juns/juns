import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
  count: number;
};

const MainCountCard = ({ title, count }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Count>{count}</Count>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 3.75rem;

  background-color: #fff;
  box-shadow: ${(props) => props.theme.boxShadow.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 0.375rem;

  ${(props) =>
    props.theme.device('tablet')(`
  height: 5rem;
  `)}
`;

const Title = styled.div`
  width: 100%;

  font-family: 'Bungee';
  font-size: 0.625rem;
  fon-weight: 700;

  color: ${(props) => props.theme.color.purple};

  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1rem;
  `)}
`;

const Count = styled(Title)`
  margin-top: 0.375rem;
  font-size: 1.25rem;
`;

export default MainCountCard;
