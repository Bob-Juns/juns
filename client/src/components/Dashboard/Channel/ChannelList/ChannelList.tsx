import React from 'react';

import styled from 'styled-components';
import ChannelCard from '@components/Dashboard/Channel/ChannelList/ChannelCard';
const ChannelList = () => {
  return (
    <Container>
      <ChannelCard />
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

export default ChannelList;
