import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import chevronIcon from '@assets/icons/chevron.svg';

type Props = {
  channel: CurrentChannel;
};

const SearchListItem = ({ channel }: Props) => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`/channel/${channel.channelId}`)}>
      <Category category={channel.category}>{channel.category}</Category>
      <Title>{channel.channelTitle}</Title>
      <Chevron />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 0.375rem 0.5rem;
  display: flex;
  align-items: center;

  cursor: pointer;

  &: hover {
    color: ${(props) => props.theme.color.green};
    background-color: ${(props) => props.theme.color.gray.light};
  }
`;

const Category = styled.div<{ category: string }>`
  width: 3rem;
  height: 1.125rem;
  margin-right: 0.375rem;
  font-size: 0.625rem;
  font-weight: 700;
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

  border-radius: 0.375rem;

  ${(props) =>
    props.theme.device('tablet')(`
  width:3.75rem;
  height: 1.5rem;
  margin-right: 1rem;
  font-size: 0.75rem;
  `)}
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 700;

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1rem;
  `)}
`;

const Chevron = styled(chevronIcon)`
  width: 0.75rem;
  transform: rotate(90deg);
  margin-left: auto;

  ${(props) =>
    props.theme.device('tablet')(`
  width: 1rem;
  `)}
`;

export default SearchListItem;
