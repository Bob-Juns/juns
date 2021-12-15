import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';
import TopMenuItem from '@components/Dashboard/TopMenu/TopMenuItem';

type Props = {
  dashboardMenu: DashboardMenu;
  selectDashboardMenu: (payload: CurrentDashboardMenu) => void;
};

const TopMenu = ({ dashboardMenu, selectDashboardMenu }: Props) => {
  return (
    <Container>
      {dashboardMenu.allDashboardMenus.map((menu: string) => (
        <TopMenuItem
          key={menu}
          menu={menu}
          onClick={() => selectDashboardMenu(menu)}
          selected={dashboardMenu.currentDashboardMenu === menu}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 3rem;

  padding: 0 3rem;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 3.75rem;
  left: 50%;

  transform: translateX(-50%);
  border-bottom: 1px solid ${(props) => props.theme.color.yellow};
`;

const mapStateToProps = (state: {
  menus: { dashboardMenu: DashboardMenu };
}) => ({
  dashboardMenu: state.menus.dashboardMenu,
});

const mapDispatchToProps = (dispatch: Dispatch<MenuAction>) => ({
  selectDashboardMenu: (payload: CurrentDashboardMenu) =>
    dispatch(actions.selectDashboardMenu(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
