import React, { Dispatch, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';
import Modal from '@components/Common/Modal/Modal';

import trashIcon from '@assets/icons/trash.svg';
import { toast } from 'react-toastify';

type Props = {
  open: boolean;
  user: CurrentUser;
  deleteUser: (userEmail: string) => any;
  updateAuthority: (userEmail: string, isAdmin: boolean) => any;
  getUsers: () => void;
};

const UserCardMenu = ({
  open,
  user,
  deleteUser,
  updateAuthority,
  getUsers,
}: Props) => {
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

  const onClickModalClose = () => {
    setIsModalOpen({
      ...isModalOpen,
      authority: false,
      delete: false,
    });
  };

  const onClickUpdateAuthority = () => {
    updateAuthority(user.userEmail, user.isAdmin ? false : true).then(
      (response: MessageResponse) => {
        getUsers();
        onClickModalClose();
        toast.success(response.payload.message);
      },
    );
  };

  const onClickDeleteUser = () => {
    deleteUser(user.userEmail)
      .then((response: MessageResponse) => {
        getUsers();
        onClickModalClose();
        toast.success(response.payload.message);
      })
      .catch((error: ErrorMessageResponse) =>
        console.log(error.response.data.message),
      );
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
      <Modal
        open={isModalOpen.delete}
        icon={<Trash />}
        title="유저가 삭제됩니다."
        onClickCancel={onClickModalClose}
        onClickConfirm={onClickDeleteUser}
      >
        <Em> [ {user.userName} ]</Em>이/가 영구적으로 삭제됩니다. 삭제
        하시겠습니까?
      </Modal>
      <Modal
        open={isModalOpen.authority}
        icon={<Trash />}
        title="권한이 변경됩니다."
        onClickCancel={onClickModalClose}
        onClickConfirm={onClickUpdateAuthority}
      >
        <Em> {user.userName}</Em>님의 권한이{' '}
        <Em>[{user.isAdmin ? ' 일반 ' : ' 관리자 '}]</Em>(으)로 변경됩니다.
        변경하시겠습니까?
      </Modal>
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

const Trash = styled(trashIcon)`
  width: 100%;
`;

const Em = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.color.green};
`;

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  deleteUser: (userEmail: string) => dispatch(actions.deleteUser(userEmail)),
  updateAuthority: (userEmail: string, isAdmin: boolean) =>
    dispatch(actions.updateAuthority(userEmail, isAdmin)),
  getUsers: () => dispatch(actions.getUsers()),
});

export default connect(null, mapDispatchToProps)(UserCardMenu);
