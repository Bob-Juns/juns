import React, { Dispatch, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';
import bookmarkIcon from '@assets/icons/bookmark.svg';

import { toast } from 'react-toastify';

type Props = {
  users: User;
  channels: Channel;
  checkAuth: () => void;
  addToBookmark: (channel: CurrentChannel) => any;
  removeFromBookmark: (channel: CurrentChannel) => any;
};

const ChannelInfo = ({
  users,
  channels,
  checkAuth,
  addToBookmark,
  removeFromBookmark,
}: Props) => {
  const checkBookmark = () => {
    return users.currentUser.bookmark?.some(
      (channel: CurrentChannel) =>
        channel.channelId === channels.currentChannel.channelId,
    );
  };

  const onClickBookmark = () => {
    checkBookmark()
      ? removeFromBookmark(channels.currentChannel).then(
          (response: MessageResponse) => {
            checkAuth();
            toast.success(response.payload.message);
          },
        )
      : addToBookmark(channels.currentChannel).then(
          (response: MessageResponse) => {
            checkAuth();
            toast.success(response.payload.message);
          },
        );
  };

  return (
    <Container>
      <Bookmark added={checkBookmark() ? 1 : 0} onClick={onClickBookmark} />
      <Cover src={channels.currentChannel.channelCover.filePath} />
      <Info>
        <Category category={channels.currentChannel.category}>
          {channels.currentChannel.category}
        </Category>
        <TitleKo>{channels.currentChannel.channelTitle}</TitleKo>
        <TitleEn>{channels.currentChannel.channelId}</TitleEn>
        <Wrapper>
          <Subtitle>제작</Subtitle>
          <Producer>{channels.currentChannel.channelProducer}</Producer>
        </Wrapper>
        <Wrapper>
          <Subtitle>출연</Subtitle>
          <Casts>
            {channels.currentChannel.channelCast.map((cast: string) => (
              <Cast key={cast}>{cast}</Cast>
            ))}
          </Casts>
        </Wrapper>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 1rem;

  background-color: #fff;

  display: flex;
  justify-content: space-between;

  position: relative;
`;

const Bookmark = styled(bookmarkIcon)<{ added: boolean }>`
  width: 0.75rem;
  color: ${(props) => (props.added ? props.theme.color.yellow : 'transparent')};

  position: absolute;
  top: 0;
  right: 1rem;

  cursor: pointer;

  ${(props) =>
    props.theme.device('tablet')(`
  width: 1rem;
  `)}
`;

const Cover = styled.div<{ src: string }>`
  width: 20%;
  height: 0;
  padding-top: 26.67%;

  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;

  box-shadow: ${(props) => props.theme.boxShadow.primary};
  border-radius: 0.25rem;

  ${(props) =>
    props.theme.device('tablet')(`
  width: 15%;
  height: 0;
  padding-top: 20%;
  `)}
`;

const Info = styled.div`
  width: 75%;

  display: flex;
  flex-direction: column;

  ${(props) =>
    props.theme.device('tablet')(`
  width: 80%;
  `)}
`;

const Category = styled.div<{ category: string }>`
  width: fit-content;
  padding: 0.25rem 0.5rem;

  font-size: 0.5rem;
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

  border-radius: 0.375rem;
`;

const TitleKo = styled.div`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.green};

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1.125rem;
  `)}
`;

const TitleEn = styled(TitleKo)`
  margin-top: 0.25rem;
  font-size: 0.625rem;
  font-weight: 400;
  color: #000;

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1rem;
  `)}
`;

const Wrapper = styled.div`
  margin-top: auto;
  display: flex;

  &: last-child {
    margin-top: 0.375rem;
  }
`;

const Subtitle = styled.div`
  font-size: 0.625rem;
  font-weight: 700;
  margin-right: 0.375rem;

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 0.75rem;
  `)}
`;

const Producer = styled.div`
  font-size: 0.625rem;

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 0.75rem;
  `)}
`;

const Casts = styled.ul`
  display: flex;
`;

const Cast = styled.li`
  margin-right: 0.25rem;
  font-size: 0.625rem;
  &:after {
    content: ', ';
  }

  &:last-child {
    margin-right: 0;
    &:after {
      content: ' 등';
    }
  }

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 0.75rem;
  `)}
`;

const mapStateToProps = (state: { users: User; channels: Channel }) => ({
  users: state.users,
  channels: state.channels,
});

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  checkAuth: () => dispatch(actions.checkAuth()),
  addToBookmark: (channel: CurrentChannel) =>
    dispatch(actions.addToBookmark(channel)),
  removeFromBookmark: (channel: CurrentChannel) =>
    dispatch(actions.removeFromBookmark(channel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelInfo);
