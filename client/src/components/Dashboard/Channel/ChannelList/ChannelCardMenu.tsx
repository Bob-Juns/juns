import React, { Dispatch, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';

import ChannelDeleteModal from './ChannelDeleteModal';

type Props = {
  open: boolean;
  channelId: string;
  getChannel: (channelId: string) => any;
};
const ChannelCardMenu = ({ open, channelId, getChannel }: Props) => {
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
      <ChannelDeleteModal
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

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1rem;
  padding: 0.5rem 1.25rem;
  `)}
`;

const mapDispatchToProps = (dispatch: Dispatch<ChannelAction>) => ({
  getChannel: (channelId: string) => dispatch(actions.getChannel(channelId)),
});

export default connect(null, mapDispatchToProps)(ChannelCardMenu);
