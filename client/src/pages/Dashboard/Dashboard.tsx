import React, { useState } from 'react';
import Page from '@components/Common/Layouts/Page';
import Main from '@components/Dashboard/Main/Main';
import Channel from '@components/Dashboard/Channel/Channel';
import TopMenu from '@components/Dashboard/TopMenu/TopMenu';

const Dashboard = () => {
  const [currentMenu, setCurrentMenu] = useState<string>('홈');
  const menus = ['홈', '유저', '채널'];

  return (
    <Page dashboard>
      <TopMenu
        menus={menus}
        currentMenu={currentMenu}
        setCurrentMenu={setCurrentMenu}
      />
      {currentMenu === '유저' ? (
        <div>유저</div>
      ) : currentMenu === '채널' ? (
        <Channel />
      ) : (
        <Main />
      )}
    </Page>
  );
};

export default Dashboard;
