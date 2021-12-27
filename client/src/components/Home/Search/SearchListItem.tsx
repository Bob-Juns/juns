import React from 'react';
import styled from 'styled-components';
import chevronIcon from '@assets/icons/chevron.svg';

type Props = {
  category: string;
  title: string;
};

const SearchListItem = ({ category, title }: Props) => {
  return (
    <Container>
      <Category category={category}>{category}</Category>
      <Title>{title}</Title>
      <Chevron />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 2.2rem;
  display: flex;
  align-items: center;
`;

const Category = styled.div<{ category: string }>`
  width: 3rem;
  height: 1.125rem;
  margin-right: 0.375rem;
  font-size: 0.625rem;

  color: #fff;
  background-color: ${(props) =>
    props.category === '드라마'
      ? props.theme.color.category.drama
      : props.category === '예능'
      ? props.theme.color.category.ent
      : props.category === '영화'
      ? props.theme.color.category.movie
      : props.category === '게임'
      ? props.theme.color.category.game
      : props.theme.color.category.etc};

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.25rem;
`;

const Title = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
`;

const Chevron = styled(chevronIcon)`
  width: 0.75rem;
  transform: rotate(90deg);
  margin-left: auto;
`;

export default SearchListItem;
