import React, { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';

import styled from 'styled-components';

const BookmarkListItem = lazy(
  () =>
    import(
      /* webpackChunkName: "BookmarkListItem" */ '@components/User/Bookmark/BookmarkListItem'
    ),
);
import ListItemSkeleton from '@components/Skeleton/ListItem/ListItemSkeleton';

type Props = {
  users: User;
};

const BookmarkList = ({ users }: Props) => {
  const navigate = useNavigate();

  return (
    <Container>
      {users.currentUser.bookmark.map((channel: CurrentChannel) => (
        <Suspense key={channel.channelId} fallback={<ListItemSkeleton />}>
          <BookmarkListItem
            onClick={() => navigate(`/channel/${channel.channelId}`)}
            src={channel.channelCover.filePath}
            category={channel.category}
            title={channel.channelTitle}
          />
        </Suspense>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  width: 100%;

  padding: 0.5rem 1rem;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-row-gap: 1rem;
  grid-column-gap: 0.375rem;
`;

const mapStateToProps = (state: { users: User }) => ({
  users: state.users,
});

export default connect(mapStateToProps)(BookmarkList);
