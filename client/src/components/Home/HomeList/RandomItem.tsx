import React from 'react';
import styled from 'styled-components';

type Props = {
  onClick: () => void;
  src: string;
  title: string;
};

const RandomItem = ({ onClick, src, title }: Props) => {
  return (
    <Container onClick={onClick}>
      <Cover src={src} />
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Cover = styled.div<{ src: string }>`
  width: 100%;
  height: 0;
  padding-top: 133.34%;
  margin-bottom: 0.375rem;

  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;

  box-shadow: ${(props) => props.theme.boxShadow.primary};

  border-radius: 0.375rem;
`;

const Title = styled.div`
  width: 100%;
  color: ${(props) => props.theme.color.green};
  font-size: 0.625rem;
  font-weight: 700;

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 0.875rem;
  `)}
`;

export default RandomItem;
