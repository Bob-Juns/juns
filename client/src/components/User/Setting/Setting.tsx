import React from 'react';

import { connect } from 'react-redux';

import styled from 'styled-components';

import UpdateEmail from '@components/User/Setting/UpdateEmail';
import UpdateProfile from '@components/User/Setting/UpdateProfile';
import UpdatePassword from '@components/User/Setting/UpdatePassword';
import Withdraw from '@components/User/Setting/Withdraw';

type Props = {
  users: User;
};

const _Setting = ({ users }: Props) => {
  return (
    <Container>
      <UpdateProfile />
      {users.currentUser.registerWith === 'kakao' ? (
        users.currentUser.userId === users.currentUser.userEmail && (
          <UpdateEmail />
        )
      ) : (
        <UpdatePassword />
      )}
      <Withdraw />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 3.75rem;
  padding: 1rem 0.5rem;
`;

const mapStateToProps = (state: { users: User }) => ({
  users: state.users,
});

export default connect(mapStateToProps)(_Setting);
