import React from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';

import styled from 'styled-components';

import Page from '@components/Common/Layouts/Page';

type Props = {
  users: User;
};

const Bookmark = ({ users }: Props) => {
  const navigate = useNavigate();

  return (
    <Page blur>
      <Titles>
        <Em>{users.currentUser.userName}</Em>님의 찜 목록
      </Titles>
      {users.currentUser.bookmark.length > 0 ? (
        <List>
          {users.currentUser.bookmark.map((channel: CurrentChannel) => (
            <Wrapper
              key={channel.channelId}
              onClick={() => navigate(`/channel/${channel.channelId}`)}
            >
              <Cover src={channel.channelCover.filePath} />
              <Title category={channel.category}>{channel.channelTitle}</Title>
            </Wrapper>
          ))}
        </List>
      ) : (
        <Empty>찜한 채널이 없습니다.</Empty>
      )}
    </Page>
  );
};

const Titles = styled.div`
  width: 100%;
  margin-top: 3.75rem;
  padding: 1rem 0.5rem;

  display: flex;
  justify-content: center;

  color: ${(props) => props.theme.color.purple};

  font-size: 0.875rem;
`;

const Em = styled.div`
  font-weight: 700;
`;

const List = styled.ul`
  width: 100%;

  padding: 0 0.5rem 1rem;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-row-gap: 1rem;
  grid-column-gap: 0.375rem;
`;

const Wrapper = styled.li`
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

const Empty = styled.div`
  width: 100%;
  margin-top: 3rem;

  display: flex;
  justify-content: center;

  color: ${[(props) => props.theme.color.gray.base]};
`;

const mapStateToProps = (state: { users: User }) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Bookmark);
