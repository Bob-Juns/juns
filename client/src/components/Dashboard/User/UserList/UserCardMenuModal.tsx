import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';
import Modal from '@components/Common/Modal/Modal';

import trashIcon from '@assets/icons/trash.svg';
import changeIcon from '@assets/icons/authorityChange.svg';

import { toast } from 'react-toastify';

type Props = {
  user: CurrentUser;
  isModalOpen: {
    authority: boolean;
    delete: boolean;
  };
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{
      authority: boolean;
      delete: boolean;
    }>
  >;
  deleteUser: (userEmail: string) => any;
  updateAuthority: (userEmail: string, isAdmin: boolean) => any;
  getUsers: () => void;
};

const UserCardMenuModal = ({
  user,
  isModalOpen,
  setIsModalOpen,
  deleteUser,
  updateAuthority,
  getUsers,
}: Props) => {
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
        toast.error(error.response.data.message),
      );
  };
  return (
    <>
      <Modal
        open={isModalOpen.delete}
        icon={<Trash />}
        title="유저가 삭제됩니다."
        onClickCancel={onClickModalClose}
        onClickConfirm={onClickDeleteUser}
      >
        <Em>[ {user.userName} ]</Em>이/가 영구적으로 삭제됩니다. 삭제
        하시겠습니까?
      </Modal>
      <Modal
        open={isModalOpen.authority}
        icon={<Change />}
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

const Trash = styled(trashIcon)`
  width: 100%;
`;

const Change = styled(changeIcon)`
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

export default connect(null, mapDispatchToProps)(UserCardMenuModal);
