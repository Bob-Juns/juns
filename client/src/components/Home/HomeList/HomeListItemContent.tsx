import React from 'react';

import styled from 'styled-components';

type Props = {
  onMouseMove: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  src: string;
  title: string;
  category: string;
};

const HomeListItemContent = ({
  onMouseMove,
  onMouseDown,
  onMouseUp,
  src,
  title,
  category,
}: Props) => {
  return (
    <Container
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <Cover src={src} />
      <Title category={category}>{title}</Title>
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

const Title = styled.div<{ category: string }>`
  width: 98%;
  color: ${(props) =>
    props.category === '드라마'
      ? props.theme.color.category.drama
      : props.category === '예능'
      ? props.theme.color.category.ent
      : props.category === '영화'
      ? props.theme.color.category.movie
      : props.category === '게임'
      ? props.theme.color.category.game
      : props.theme.color.category.etc};

  font-size: 0.6rem;
  font-weight: 700;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 0.75rem;
  `)}
`;

export default HomeListItemContent;
