import React, { Dispatch, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { actions } from 'store';

import Modal from '@components/Common/Modal/Modal';

import styled from 'styled-components';
import trashIcon from '@assets/icons/trash.svg';

import { toast } from 'react-toastify';

type Props = {
  open: boolean;
  channelId: string;
  channels: Channel;
  deleteChannel: (channelId: string) => any;
  getChannels: () => void;
  getChannel: (channelId: string) => any;
};
const ChannelCardMenu = ({
  open,
  channelId,
  channels,
  deleteChannel,
  getChannels,
  getChannel,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const menus = ['수정', '삭제'];
  const navigate = useNavigate();

  const onClickUpdate = () => {
    navigate(`/channel-update/${channelId}`);
  };

  const onClickOpenModal = () => {
    getChannel(channelId);
    setIsModalOpen(true);
  };

  const onClickCancelModal = () => {
    setIsModalOpen(false);
  };

  const onClickDelete = () => {
    setIsModalOpen(false);
    deleteChannel(channelId)
      .then((response: MessageResponse) => {
        getChannels();
        toast.success(response.payload.message);
      })
      .catch((error: ErrorMessageResponse) =>
        toast.warning(error.response.data.message),
      );
  };
  return (
    <>
      <Container open={open}>
        {menus.map((menu: string) => (
          <Menu
            key={menu}
            onClick={menu === '수정' ? onClickUpdate : onClickOpenModal}
          >
            {menu}
          </Menu>
        ))}
      </Container>
      <Modal
        open={isModalOpen}
        icon={<Trash />}
        title="채널이 삭제됩니다."
        onClickCancel={onClickCancelModal}
        onClickConfirm={onClickDelete}
      >
        <Em>[{channels.currentChannel.channelTitle}]</Em>이/가 영구적으로
        삭제됩니다. 삭제 하시겠습니까?
      </Modal>
    </>
  );
};

const Container = styled.div<{ open: boolean }>`
  position: absolute;
  top: 2.1rem;
  right: 0;

  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.open ? '1' : '0')};

  background-color: #fff;

  box-shadow: ${(props) => props.theme.boxShadow.primary};
  border-radius: 0.375rem;

  z-index: 9;

  transform: ${(props) => (props.open ? 'translateY(0)' : 'translateY(-1rem)')};
  transition: all 0.3s ease-in-out;
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

const mapStateToProps = (state: { channels: Channel }) => ({
  channels: state.channels,
});

const mapDispatchToProps = (dispatch: Dispatch<ChannelAction>) => ({
  deleteChannel: (channelId: string) =>
    dispatch(actions.deleteChannel(channelId)),
  getChannels: () => dispatch(actions.getChannels()),
  getChannel: (channelId: string) => dispatch(actions.getChannel(channelId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelCardMenu);
