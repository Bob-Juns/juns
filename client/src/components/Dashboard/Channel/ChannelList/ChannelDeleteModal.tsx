import React, { Dispatch } from 'react';

import { connect } from 'react-redux';
import { actions } from 'store';

import Modal from '@components/Common/Modal/Modal';

import styled from 'styled-components';
import trashIcon from '@assets/icons/trash.svg';

import { toast } from 'react-toastify';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  channels: Channel;
  getChannels: () => void;
  deleteChannel: (channelId: string) => any;
};

const ChannelDeleteModal = ({
  isModalOpen,
  setIsModalOpen,
  channels,
  getChannels,
  deleteChannel,
}: Props) => {
  const onClickCancelModal = () => {
    setIsModalOpen(false);
  };

  const onClickDelete = () => {
    setIsModalOpen(false);
    deleteChannel(channels.currentChannel.channelId)
      .then((response: MessageResponse) => {
        getChannels();
        toast.success(response.payload.message);
      })
      .catch((error: ErrorMessageResponse) =>
        toast.warning(error.response.data.message),
      );
  };
  return (
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
  );
};

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
  getChannels: () => dispatch(actions.getChannels()),
  deleteChannel: (channelId: string) =>
    dispatch(actions.deleteChannel(channelId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDeleteModal);
