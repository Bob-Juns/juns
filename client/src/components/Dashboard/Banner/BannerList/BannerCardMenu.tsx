import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import BannerCardMenuModal from './BannerCardMenuModal';

type Props = {
  open: boolean;
  banner: CurrentBanner;
};

const BannerCardMenu = ({ open, banner }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const menus = ['수정', '삭제'];
  const navigate = useNavigate();

  const onClickUpdate = () => {
    navigate(`/banner-update/${banner.bannerId}`);
  };

  const onClickDelete = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <Container open={open}>
        {menus.map((menu: string) => (
          <Menu
            key={menu}
            onClick={menu === '수정' ? onClickUpdate : onClickDelete}
          >
            {menu}
          </Menu>
        ))}
      </Container>
      <BannerCardMenuModal
        banner={banner}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

const Container = styled.div<{ open: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;

  background-color: #fff;
  box-shadow: ${(props) => props.theme.boxShadow.primary};
  border-radius: 0.375rem;

  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};

  transform: ${(props) => (props.open ? 'translateX(0)' : 'translateX(2rem)')};
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

export default BannerCardMenu;
