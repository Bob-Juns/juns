import React from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';

import styled from 'styled-components';

type Props = {
  menus: Menu;
  channels: Channel;
};

const ExplorerList = ({ menus, channels }: Props) => {
  const navigate = useNavigate();

  return (
    <Container>
      {channels.allChannels
        .filter((channel: CurrentChannel) =>
          menus.categoryMenu.currentCategoryMenu === '전체'
            ? channels.allChannels
            : channel.category === menus.categoryMenu.currentCategoryMenu,
        )
        .map((channel: CurrentChannel) => (
          <Wrapper
            key={channel.channelId}
            onClick={() => navigate(`/channel/${channel.channelId}`)}
          >
            <Cover src={channel.channelCover.filePath} />
            <Title category={channel.category}>{channel.channelTitle}</Title>
          </Wrapper>
        ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 6.75rem;
  padding: 1rem 0.5rem;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-row-gap: 1rem;
  grid-column-gap: 0.375rem;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  cursor: pointer;
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
  width: 100%;
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
`;

const mapStateToProps = (state: { menus: Menu; channels: Channel }) => ({
  menus: state.menus,
  channels: state.channels,
});

export default connect(mapStateToProps)(ExplorerList);
