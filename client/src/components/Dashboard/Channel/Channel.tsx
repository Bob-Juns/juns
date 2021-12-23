import React from 'react';

import styled from 'styled-components';

import ChannelFilter from '@components/Dashboard/Channel/ChannelFilter/ChannelFilter';
import ChannelList from '@components/Dashboard/Channel/ChannelList/ChannelList';

const Channel = () => {
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

export default Channel;
