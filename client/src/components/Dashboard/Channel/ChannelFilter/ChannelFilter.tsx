import React from 'react';

import ChannelCreateButton from './ChannelCreateButton';
import ChannelSearch from './ChannelSearch';
import ChannelDropdown from './ChannelDropdown';

import styled from 'styled-components';

type Props = {
  onClickCreateButton: () => void;
};

const ChannelFilter = ({ onClickCreateButton }: Props) => {
  return (
    <Container>
      <ChannelCreateButton onClickCreateButton={onClickCreateButton} />
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
