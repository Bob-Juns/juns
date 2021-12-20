import React, { useState } from 'react';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';

import UserFilter from './UserFilter/UserFilter';
import UserList from './UserList/UserList';

type Props = {
  users: User;
};

const User = ({ users }: Props) => {
  const [message, setMessage] = useState<string>('');

  const intersection = users.filteredUsers.filter((user: CurrentUser) =>
    users.searchedUsers.includes(user),
  );

  return (
    <Container>
      <UserFilter intersection={intersection} setMessage={setMessage} />
      <UserList intersection={intersection} message={message} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const mapStateToProps = (state: { users: User }) => ({
  users: state.users,
});

export default connect(mapStateToProps)(User);
