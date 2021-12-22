import React, { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store';
import Page from '@components/Common/Layouts/Page';
import TopMenu from '@components/Dashboard/TopMenu/TopMenu';
import Main from '@components/Dashboard/Main/Main';
import Channel from '@components/Dashboard/Channel/Channel';
import User from '@components/Dashboard/User/User';

type Props = {
  dashboardMenu: DashboardMenu;
  getUsers: () => void;
  getChannels: () => void;
  selectDashboardMenu: (payload: CurrentDashboardMenu) => void;
};

const Dashboard = ({
  dashboardMenu,
  getUsers,
  getChannels,
  selectDashboardMenu,
}: Props) => {
  useEffect(() => {
    getUsers();
    getChannels();
    return () => selectDashboardMenu('홈');
  }, []);

  return (
    <>
      <TopMenu />
      <Page dashboard>
        {dashboardMenu.currentDashboardMenu === '유저' ? (
          <User />
        ) : dashboardMenu.currentDashboardMenu === '채널' ? (
          <Channel />
        ) : (
          <Main />
        )}
      </Page>
    </>
  );
};

const mapStateToProps = (state: {
  menus: { dashboardMenu: DashboardMenu };
}) => ({
  dashboardMenu: state.menus.dashboardMenu,
});
const mapDispatchToProps = (
  dispatch: Dispatch<UserAction | ChannelAction | MenuAction>,
) => ({
  getUsers: () => dispatch(actions.getUsers()),
  getChannels: () => dispatch(actions.getChannels()),
  selectDashboardMenu: (payload: CurrentDashboardMenu) =>
    dispatch(actions.selectDashboardMenu(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
