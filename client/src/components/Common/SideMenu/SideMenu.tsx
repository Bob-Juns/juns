import React, { Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';

import SideMenuList from '@components/Common/SideMenu/SideMenuList';
import Logout from '@components/Common/SideMenu/Logout';

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
      checkAuth().then((res: { isAuth: boolean }) => {
        setIsMenuOpen(false);
        navigate('/', { replace: true });
        toast.success(response.payload.message);
      });
    });
  };

  return (
    <>
      <Background open={isMenuOpen} onClick={() => setIsMenuOpen(false)} />
      <Container open={isMenuOpen}>
        <Head>
          {users.currentUser.isAuth ? (
            <>
              <Name>안녕하세요! {users.currentUser.userName}님 </Name>
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
          <SideMenuList />
          {users.currentUser.isAuth && <Logout onClick={onClickLogout} />}
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

  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.open ? '0.7' : '0')};
  background-color: #000;

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
  font-size: 1rem;
  font-weight: 700;
`;

const Email = styled.div`
  font-size: 0.75rem;
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
    color: ${(props) => props.theme.color.gray.base};
  }
`;

const Register = styled.div`
  margin-left: 0.25rem;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.color.gray.base};
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

const mapStateToProps = (state: { users: User }) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  logout: () => dispatch(actions.logout()),
  checkAuth: () => dispatch(actions.checkAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
