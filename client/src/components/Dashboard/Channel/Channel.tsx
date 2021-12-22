import React, { Dispatch, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

import ChannelFilter from '@components/Dashboard/Channel/ChannelFilter/ChannelFilter';
import ChannelList from '@components/Dashboard/Channel/ChannelList/ChannelList';
import { actions } from 'store';

type Props = {
  channels: Channel;
  getChannelIntersection: () => void;
};

const Channel = ({ channels, getChannelIntersection }: Props) => {
  useEffect(() => {
    getChannelIntersection();
  }, [channels.filteredChannels, channels.searchedChannels]);

  return (
    <Container>
      <ChannelFilter />
      <ChannelList />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const mapStateToProps = (state: { channels: Channel }) => ({
  channels: state.channels,
});

const mapDispatchToProps = (dispatch: Dispatch<ChannelAction>) => ({
  getChannelIntersection: () => dispatch(actions.getChannelIntersection()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
