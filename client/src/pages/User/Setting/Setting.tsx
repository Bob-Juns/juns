import React from 'react';

import { connect } from 'react-redux';

import Page from '@components/Common/Layouts/Page';
import UpdateEmail from '@components/user/Setting/UpdateEmail';
import UpdateProfile from '@components/User/Setting/UpdateProfile';
import UpdatePassword from '@components/User/Setting/UpdatePassword';
import Withdraw from '@components/User/Setting/Withdraw';

type Props = {
  users: User;
};

const Setting = ({ users }: Props) => {
  return (
    <Page>
      <UpdateProfile />
      {users.currentUser.registerWith === 'kakao' ? (
        users.currentUser.userId === users.currentUser.userEmail && (
          <UpdateEmail />
        )
      ) : (
        <UpdatePassword />
      )}
      <Withdraw />
    </Page>
  );
};

const mapStateToProps = (state: { users: User }) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Setting);
