import React from 'react';

import { connect } from 'react-redux';

import styled from 'styled-components';
import SideMenuItem from '@components/Common/SideMenu/SideMenuItem';

type Props = {
  users: User;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideMenuList = ({ users, setIsMenuOpen }: Props) => {
  return (
    <Container>
      <SideMenuItem
        title="탐색"
        path="/explorer"
        setIsMenuOpen={setIsMenuOpen}
      />
      {users.currentUser.isAuth && (
        <SideMenuItem
          title="찜 목록"
          path="/bookmark"
          setIsMenuOpen={setIsMenuOpen}
        />
      )}
      {users.currentUser.isAdmin && (
        <SideMenuItem
          title="관리"
          path="/dashboard"
          setIsMenuOpen={setIsMenuOpen}
        />
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
