import React, { Dispatch, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';
import Modal from '@components/Common/Modal/Modal';

import trashIcon from '@assets/icons/trash.svg';
import changeIcon from '@assets/icons/authorityChange.svg';

import { toast } from 'react-toastify';
import UserCardMenuModal from './UserCardMenuModal';

type Props = {
  open: boolean;
  user: CurrentUser;
  deleteUser: (userEmail: string) => any;
  updateAuthority: (userEmail: string, isAdmin: boolean) => any;
  getUsers: () => void;
};

const UserCardMenu = ({ open, user }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<{
    authority: boolean;
    delete: boolean;
  }>({
    authority: false,
    delete: false,
  });
  const menus = ['권한', '삭제'];

  const onClickAuthorityMenu = () => {
    setIsModalOpen({
      ...isModalOpen,
      authority: true,
    });
  };
  const onClickDeleteMenu = () => {
    setIsModalOpen({
      ...isModalOpen,
      delete: true,
    });
  };

  return (
    <>
      <Container open={open}>
        {menus.map((menu: string) => (
          <Menu
            key={menu}
            onClick={menu === '권한' ? onClickAuthorityMenu : onClickDeleteMenu}
          >
            {menu}
          </Menu>
        ))}
      </Container>
      <UserCardMenuModal
        user={user}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

const Container = styled.div<{ open: boolean }>`
  position: absolute;
  top: 0;
  right: 0;

  background-color: #fff;

  box-shadow: ${(props) => props.theme.boxShadow.primary};
  border-radius: 0.375rem;

  z-index: 9;

  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};

  transform: ${(props) =>
    props.open ? 'translateX(0)' : 'translateX(0.75rem)'};
  transition: all 0.3s linear;
`;

const Menu = styled.div`
  width: 100%;
  padding: 0.375rem 1.25rem;

  font-size: 0.75rem;

  display: flex;
  justify-content: center;

  cursor: pointer;

  &: first-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem 0.25rem 0 0;
  }

  &:last-child {
    border-radius: 0 0 0.375rem 0.375rem;
  }

  &:hover {
    color: ${(props) => props.theme.color.purple};
    background-color: ${(props) => props.theme.color.gray.light};
    font-weight: 700;
  }
`;

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  deleteUser: (userEmail: string) => dispatch(actions.deleteUser(userEmail)),
  updateAuthority: (userEmail: string, isAdmin: boolean) =>
    dispatch(actions.updateAuthority(userEmail, isAdmin)),
  getUsers: () => dispatch(actions.getUsers()),
});

export default connect(null, mapDispatchToProps)(UserCardMenu);
