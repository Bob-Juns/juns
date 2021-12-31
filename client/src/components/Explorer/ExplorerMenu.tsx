import React, { Dispatch, useEffect } from 'react';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';

type Props = {
  menus: Menu;
  selectCategoryMenu: (payload: string) => void;
};

const ExplorerMenu = ({ menus, selectCategoryMenu }: Props) => {
  useEffect(() => {
    menus.categoryMenu.currentCategoryMenu === '카테고리' &&
      selectCategoryMenu('전체');
  }, []);

  return (
    <Container>
      {menus.categoryMenu.allCategoryMenus.map((menu: string) => (
        <Menu
          key={menu}
          onClick={() => selectCategoryMenu(menu)}
          selected={menus.categoryMenu.currentCategoryMenu === menu}
        >
          {menu}
        </Menu>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 3rem;
  padding: 0 0.5rem;

  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(1px);

  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 3.75rem;
  left: 0;

  border-bottom: 1px solid ${(props) => props.theme.color.yellow};
`;

const Menu = styled.div<{ selected?: boolean }>`
  width: calc(100vw / 6);
  height: 100%;
  margin-top: 2px;
  font-size: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    `
    font-weight: 700;
    color: ${props.theme.color.purple};
    border-bottom: 3px solid ${props.theme.color.purple};
  `}

  &:hover {
    color: ${(props) => props.theme.color.purple};
    font-weight: 700;
    border-bottom: 3px solid ${(props) => props.theme.color.purple};
  }
`;

const mapStateToProps = (state: { menus: Menu }) => ({
  menus: state.menus,
});

const mapDispatchToProps = (dispatch: Dispatch<MenuAction>) => ({
  selectCategoryMenu: (payload: string) =>
    dispatch(actions.selectCategoryMenu(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerMenu);
