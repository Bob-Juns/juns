import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';

type Props = {
  open: boolean;
  categoryMenu: CategoryMenu;
  selectCategoryMenu: (payload: CurrentCategoryMenu) => void;
  getFilteredChannels: (payload: string) => void;
};

const ChannelDropdownMenu = ({
  open,
  categoryMenu,
  selectCategoryMenu,
  getFilteredChannels,
}: Props) => {
  const onClickCategoryMenu = (menu: string) => {
    selectCategoryMenu(menu);
    getFilteredChannels(menu);
  };

  return (
    <Container open={open}>
      {categoryMenu.allCategoryMenus.map((menu: string) => (
        <Menu key={menu} onClick={() => onClickCategoryMenu(menu)}>
          {menu}
        </Menu>
      ))}
    </Container>
  );
};

const Container = styled.div<{ open: boolean }>`
  width: 6rem;

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

  color: #000;
  font-size: 0.75rem;

  display: flex;
  justify-content: center;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  cursor: pointer;

  &: first-child {
    border-radius: 0.375rem 0.375rem 0 0;
  }

  &:last-child {
    border-bottom: none;
    border-radius: 0 0 0.375rem 0.375rem;
  }

  &:hover {
    color: ${(props) => props.theme.color.purple};
    background-color: ${(props) => props.theme.color.gray.light};
    font-weight: 700;
  }
`;

const mapStateToProps = (state: { menus: { categoryMenu: CategoryMenu } }) => ({
  categoryMenu: state.menus.categoryMenu,
});

const mapDispatchToProps = (
  dispatch: Dispatch<MenuAction | ChannelAction>,
) => ({
  selectCategoryMenu: (payload: CurrentCategoryMenu) =>
    dispatch(actions.selectCategoryMenu(payload)),
  getFilteredChannels: (payload: string) =>
    dispatch(actions.getFilteredChannels(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChannelDropdownMenu);
