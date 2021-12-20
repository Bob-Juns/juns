import React, { useState } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

import ChannelFilter from '@components/Dashboard/Channel/ChannelFilter/ChannelFilter';
import ChannelList from '@components/Dashboard/Channel/ChannelList/ChannelList';

type Props = {
  channels: Channel;
};

const Channel = ({ channels }: Props) => {
  const [message, setMessage] = useState<string>('');

  const intersection = channels.filteredChannels.filter(
    (channel: CurrentChannel) => channels.searchedChannels.includes(channel),
  );

  return (
    <Container>
      <ChannelFilter intersection={intersection} setMessage={setMessage} />
      <ChannelList intersection={intersection} message={message} />
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

export default connect(mapStateToProps)(Channel);
