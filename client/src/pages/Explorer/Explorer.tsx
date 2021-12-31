import React, { Dispatch, useEffect } from 'react';

import { connect } from 'react-redux';
import { actions } from 'store';

import Page from '@components/Common/Layouts/Page';
import ExplorerMenu from '@components/Explorer/ExplorerMenu';
import ExplorerList from '@components/Explorer/ExplorerList';

type Props = {
  getChannels: () => void;
  selectCategoryMenu: (payload: string) => void;
};

const Explorer = ({ getChannels, selectCategoryMenu }: Props) => {
  useEffect(() => {
    getChannels();
    return () => selectCategoryMenu('전체');
  }, []);

  return (
    <>
      <Page blur>
        <ExplorerMenu />
        <ExplorerList />
      </Page>
    </>
  );
};

const mapDispatchToProp = (dispatch: Dispatch<ChannelAction | MenuAction>) => ({
  getChannels: () => dispatch(actions.getChannels()),
  selectCategoryMenu: (payload: string) =>
    dispatch(actions.selectCategoryMenu(payload)),
});

export default connect(null, mapDispatchToProp)(Explorer);
