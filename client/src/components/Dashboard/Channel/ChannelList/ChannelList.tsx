import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import ChannelCard from '@components/Dashboard/Channel/ChannelList/ChannelCard';

type Props = {
  channels: Channel;
};

const ChannelList = ({ channels }: Props) => {
  return (
    <Container>
      {channels.allChannels.length > 0 ? (
        channels.allChannels.map((channel: CurrentChannel) => (
          <ChannelCard
            key={channel.channelId}
            category={channel.category}
            channelTitle={channel.channelTitle}
            channelId={channel.channelId}
          />
        ))
      ) : (
        <Empty>채널을 생성해주세요.</Empty>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 1.25rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  grid-row-gap: 0.625rem;
`;

const Empty = styled.div`
  margin: auto;
  color: ${[(props) => props.theme.color.gray.base]};
`;

const mapStateToProps = (state: { channels: Channel }) => ({
  channels: state.channels,
});

export default connect(mapStateToProps)(ChannelList);
