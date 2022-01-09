import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import styled from 'styled-components';

import Page from '@components/Common/Layouts/Page';

import useTitle from '@hooks/useTitle';
import BookmarkTitle from '@components/User/Bookmark/BookmarkTitle';
import BookmarkList from '@components/User/Bookmark/BookmarkList';

type Props = {
  users: User;
};

const Bookmark = ({ users }: Props) => {
  const changeTitle = useTitle();

  useEffect(() => {
    changeTitle('JUNSTREAMING | BOOKMARK');
  }, []);

  return (
    <Page blur>
      <BookmarkTitle userName={users.currentUser.userName} />
      {users.currentUser.bookmark?.length > 0 ? (
        <BookmarkList />
      ) : (
        <Empty>찜한 채널이 없습니다.</Empty>
      )}
    </Page>
  );
};

const Empty = styled.div`
  width: 100%;
  margin-top: 3rem;

  display: flex;
  justify-content: center;

  color: ${[(props) => props.theme.color.gray.base]};

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1.125rem;
  `)}
`;

const mapStateToProps = (state: { users: User }) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Bookmark);
