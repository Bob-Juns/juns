import React, { Dispatch, useEffect } from 'react';

import { connect } from 'react-redux';
import { actions } from 'store';

import Page from '@components/Common/Layouts/Page';
import ChannelsMenu from '@components/Channels/ChannelsMenu';
import ChannelsList from '@components/Channels/ChannelsList';

type Props = {
  getChannels: () => void;
  selectCategoryMenu: (payload: string) => void;
};

const Channels = ({ getChannels, selectCategoryMenu }: Props) => {
  useEffect(() => {
    getChannels();
    return () => selectCategoryMenu('전체');
  }, []);

  return (
    <>
      <ChannelsMenu />
      <Page location="channels">
        <ChannelsList />
      </Page>
    </>
  );
};

const mapDispatchToProp = (dispatch: Dispatch<ChannelAction | MenuAction>) => ({
  getChannels: () => dispatch(actions.getChannels()),
  selectCategoryMenu: (payload: string) =>
    dispatch(actions.selectCategoryMenu(payload)),
});

export default connect(null, mapDispatchToProp)(Channels);
