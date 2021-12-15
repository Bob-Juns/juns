import React from 'react';

import ChannelCreateButton from './ChannelCreateButton';
import ChannelSearch from './ChannelSearch';
import ChannelDropdown from './ChannelDropdown';

import styled from 'styled-components';

const ChannelFilter = () => {
  return (
    <Container>
      <ChannelCreateButton />
      <ChannelSearch />
      <ChannelDropdown />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
`;

export default ChannelFilter;
