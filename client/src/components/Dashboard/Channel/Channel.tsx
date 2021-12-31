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
  margin-top: 6.75rem;
  padding: 1rem 0.5rem;
`;

export default Channel;
