import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';
import menuIcon from '@assets/icons/menu.svg';
import ChannelCardMenu from '@components/Dashboard/Channel/ChannelList/ChannelCardMenu';

type Props = {
  category: string;
  channelTitle: string;
  channelId: string;
};

const ChannelCard = ({ category, channelTitle, channelId }: Props) => {
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const focusRef = useRef<HTMLDivElement>(null);

  const onClickOutside = (event: any) => {
    if (focusRef.current && !focusRef.current.contains(event.target)) {
      setIsSettingOpen(false);
    }
  };

  useEffect(() => {
    isSettingOpen && document.addEventListener('click', onClickOutside, true);
    return () => {
      document.removeEventListener('click', onClickOutside, true);
    };
  }, [focusRef, isSettingOpen]);

  return (
    <Container>
      <Left category={category} />
      <Right />
      <Category category={category}>
        <ChannelCardMenu open={isSettingOpen} channelId={channelId} />
        <Text>{category}</Text>
        <Wrapper
          onClick={() => setIsSettingOpen((prev) => !prev)}
          ref={focusRef}
        >
          <Setting />
        </Wrapper>
      </Category>
      <Titles category={category}>
        <Title>{channelTitle}</Title>
        <Title>{channelId}</Title>
      </Titles>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  box-shadow: ${(props) => props.theme.boxShadow.primary};
  border-radius: 0.75rem;

  position: relative;
`;

const Left = styled.div<{ category: string }>`
  width: 50%;
  height: 100%;
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
  border-radius: 0.75rem 0 0 0.75rem;
`;
const Right = styled.div`
  width: 50%;
  height: 100%;
  background-color: #fff;
  border-radius: 0 0.75rem 0.75rem 0;
`;

const Category = styled.div<{ category: string }>`
  width: 100%;
  height: 50%;
  margin-right: auto;
  padding: 0 0.75rem;

  position: absolute;
  top: 0;
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
  justify-content: space-between;
  align-items: center;

  border-radius: 0.75rem 0.75rem 0.75rem 0;
`;

const Text = styled.div`
  font-size: 0.625rem;
  font-weight: 700;
  color: #fff;
`;

const Wrapper = styled.div`
  width: 1rem;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const Setting = styled(menuIcon)`
  width: 100%;
  color: #fff;
`;

const Titles = styled.div<{ category: string }>`
  height: 50%;
  width: 100%;
  padding: 0.625rem 0.75rem;

  position: absolute;
  bottom: 0;

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
  background-color: #fff;

  display: flex;
  align-items: flex-end;

  border-radius: 0.75rem 0 0.75rem 0.75rem;
  cursor: pointer;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 0.75rem;

  &: last-child {
    margin-left: 0.25rem;
    font-size: 0.5rem;
  }
`;

export default ChannelCard;
