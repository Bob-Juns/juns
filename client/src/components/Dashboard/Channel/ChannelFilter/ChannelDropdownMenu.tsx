import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

type Props = {
  open: boolean;
  categoryMenu: CategoryMenu;
  onSelectCategory: (filter: string) => void;
};

const ChannelDropdownMenu = ({
  open,
  categoryMenu,
  onSelectCategory,
}: Props) => {
  return (
    <Container open={open}>
      {categoryMenu.allCategoryMenus.map((menu: string) => (
        <Menu key={menu} onClick={() => onSelectCategory(menu)}>
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

  ${(props) =>
    props.theme.device('tablet')(`
  width: 7rem;
  top: 3.2rem;
  `)}
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

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1rem;
  padding: 0.75rem 1.25rem;
  `)}
`;

const mapStateToProps = (state: { menus: { categoryMenu: CategoryMenu } }) => ({
  categoryMenu: state.menus.categoryMenu,
});

export default connect(mapStateToProps)(ChannelDropdownMenu);
