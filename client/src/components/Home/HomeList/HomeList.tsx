import React from 'react';

import styled from 'styled-components';
import HomeListItem from './HomeListItem';
import RandomChannels from './RandomChannels';

const HomeList = () => {
  return (
    <Container>
      <RandomChannels />
      <HomeListItem
        head="TV 드라마보다 더 재미있는 웹드라마!"
        category="드라마"
      />
      <HomeListItem
        head="예능은 보고 싶은데 다 보기엔 너무 길다면?"
        category="예능"
      />
      <HomeListItem
        head="실력 좋은 유튜버의 게임 채널, 근데 이제 꿀잼을 곁들인.."
        category="게임"
      />
      <HomeListItem
        head="무슨 영화를 볼지 고민인 당신을 위한 채널"
        category="영화"
      />
      <HomeListItem head="킬링 타임용으로 보기 좋은 채널" category="종합" />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 1.25rem 0.5rem;
`;

export default HomeList;
