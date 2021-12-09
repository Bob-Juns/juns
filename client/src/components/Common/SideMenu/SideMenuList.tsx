import React from 'react';

import { connect } from 'react-redux';

import styled from 'styled-components';
import SideMenuItem from '@components/Common/SideMenu/SideMenuItem';

type Props = {
  users: User;
};

const SideMenuList = ({ users }: Props) => {
  return (
    <Container>
      <SideMenuItem title="메뉴 1" path="/" />
      <SideMenuItem title="메뉴 2" path="/" />
      {users.currentUser.isAdmin && (
        <SideMenuItem title="관리" path="/dashboard" />
      )}
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const mapStateToProps = (state: { users: User }) => ({
  users: state.users,
});

export default connect(mapStateToProps)(SideMenuList);
