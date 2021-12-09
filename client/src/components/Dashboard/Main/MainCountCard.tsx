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
  height: 70px;

  background-color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 0.375rem;
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
`;

const Count = styled(Title)`
  margin-top: 0.375rem;
  font-size: 1.375rem;
`;

export default MainCountCard;
