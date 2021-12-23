import React from 'react';

import styled from 'styled-components';

import UserFilter from './UserFilter/UserFilter';
import UserList from './UserList/UserList';

const User = () => {
  return (
    <Container>
      <UserFilter />
      <UserList />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default User;
