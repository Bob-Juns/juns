import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

import UserCardMenu from './UserCardMenu';

import registerEmail from '@assets/icons/registerEmail.svg';
import registerKakao from '@assets/icons/registerKakao.svg';
import userIcon from '@assets/icons/user.svg';
import adminIcon from '@assets/icons/crown.svg';
import menuIcon from '@assets/icons/menu.svg';

type Props = {
  user: CurrentUser;
};

const UserCard = ({ user }: Props) => {
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const focusRef = useRef<HTMLDivElement>(null);

  const onClickOutside = (event: any) => {
    if (focusRef.current && !focusRef.current.contains(event.target)) {
      setIsSettingOpen(false);
    }
  };

  useEffect(() => {
    isSettingOpen && document.addEventListener('click', onClickOutside, true);
    return () => {
      document.removeEventListener('click', onClickOutside, true);
    };
  }, [focusRef, isSettingOpen]);

  return (
    <Container>
      <UserCardMenu open={isSettingOpen} user={user} />
      <RegisterWith registerWith={user.registerWith}>
        {user.registerWith === 'kakao' ? <Kakao /> : <Email />}
        <Role>{user.isAdmin ? <Admin /> : <User />}</Role>
      </RegisterWith>
      <UserInfo>
        <UserName>{user.userName}</UserName>
        <UserEmail>{user.userEmail}</UserEmail>
      </UserInfo>
      <Wrapper onClick={() => setIsSettingOpen((prev) => !prev)} ref={focusRef}>
        <Menu />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 3rem;
  padding-right: 0.375rem;

  display: flex;
  align-items: center;

  position: relative;
`;

const RegisterWith = styled.div<{ registerWith: string }>`
  width: 3rem;
  height: 3rem;
  margin-right: 1.25rem;
  background-color: ${(props) =>
    props.registerWith === 'kakao' ? '#ffeb00' : props.theme.color.green};
  border-radius: 0.75rem;

  position: relative;
`;

const Email = styled(registerEmail)`
  width: 100%;
  color: ${(props) => props.theme.color.green};
`;

const Kakao = styled(registerKakao)`
  width: 100%;
  color: #ffeb00;
`;

const Role = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: ${(props) => props.theme.boxShadow.primary};

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: -20%;
  right: -20%;
`;

const Admin = styled(adminIcon)`
  width: auto;
  height: 0.625rem;
  color: ${(props) => props.theme.color.yellow};
`;

const User = styled(userIcon)`
  width: auto;
  height: 0.75rem;
  color: ${(props) => props.theme.color.purple};
`;

const UserInfo = styled.div`
  height: 100%;
  margin-right: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const UserName = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
`;

const UserEmail = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.gray.base};
`;

const Wrapper = styled.div`
  width: 0.75rem;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const Menu = styled(menuIcon)`
  width: 100%;
  color: ${(props) => props.theme.color.gray.base};
  transform: rotate(90deg);
`;

export default UserCard;
