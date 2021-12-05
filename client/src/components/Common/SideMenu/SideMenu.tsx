import React, { Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';

import MenuList from '@components/Common/SideMenu/MenuList';

import { toast } from 'react-toastify';

type Props = {
  isMenuOpen: boolean;
  users: User;
  logout: () => any;
  checkAuth: () => any;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideMenu = ({
  isMenuOpen,
  users,
  logout,
  checkAuth,
  setIsMenuOpen,
}: Props) => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    logout().then((response: { payload: { message: string } }) => {
      checkAuth().then(() => {
        setIsMenuOpen(false);
        toast.success(response.payload.message);
      });
    });
  };

  return (
    <>
      <Background open={isMenuOpen} />
      <Container open={isMenuOpen}>
        <Head>
          {users.currentUser.isAuth ? (
            <>
              <Name>{users.currentUser.userName}</Name>
              <Email>{users.currentUser.userEmail}</Email>
            </>
          ) : (
            <>
              <Top>가입하고 영상 시청하기!</Top>
              <Bottom>
                <Login onClick={() => navigate('/login')}>로그인 </Login> /
                <Register onClick={() => navigate('/register')}>
                  {' '}
                  회원가입
                </Register>
              </Bottom>
            </>
          )}
        </Head>
        <Body>
          <MenuList />
          {/* {users.currentUser.isAuth && (
            <Logouts onClick={onClickLogout}>로그아웃</Logouts>
          )} */}
        </Body>
      </Container>
    </>
  );
};

const Background = styled.div<{ open: boolean }>`
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  position: absolute;
  top: 0;
  left: 0;

  background: ${(props) => (props.open ? 'rgba(0, 0, 0, 0.5)' : 'transparent')};
  transition: all 0.3s ease-in-out;
`;

const Container = styled.nav<{ open: boolean }>`
  width: 75%;
  max-width: 320px;

  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  flex-direction: column;

  transform: ${(props) => (props.open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
`;

const Head = styled.div`
  width: 100%;
  height: 30%;

  color: #fff;
  background: rgb(159, 76, 244);
  background: linear-gradient(
    315deg,
    rgba(159, 76, 244, 1) 0%,
    rgba(127, 110, 251, 1) 100%
  );

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
`;

const Email = styled.div`
  font-size: 1rem;
  margin-top: 0.5rem;
`;

const Top = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
`;

const Bottom = styled.div`
  margin-top: 1rem;

  font-size: 0.75rem;
  font-weight: 700;

  display: flex;
  justify-content: center;
`;

const Login = styled.div`
  margin-right: 0.25rem;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.color.gray};
  }
`;

const Register = styled.div`
  margin-left: 0.25rem;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.color.gray};
  }
`;

const Body = styled.div`
  width: 100%;
  height: 70%;
  background-color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Logouts = styled.div`
  width: 100%;
  height: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.75rem;

  cursor: pointer;

  &:hover {
    color: #fff;
    background: ${(props) => props.theme.color.purple};
    font-weight: 700;
  }
`;

const mapStateToProps = (state: { users: User }) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  logout: () => dispatch(actions.logout()),
  checkAuth: () => dispatch(actions.checkAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
