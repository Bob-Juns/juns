import React from 'react';

import ChannelCreateButton from './ChannelCreateButton';
import ChannelSearch from './ChannelSearch';
import ChannelDropdown from './ChannelDropdown';

import styled from 'styled-components';

type Props = {
  intersection: AllChannels;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const ChannelFilter = ({ intersection, setMessage }: Props) => {
  return (
    <Container>
      <ChannelCreateButton />
      <ChannelSearch intersection={intersection} setMessage={setMessage} />
      <ChannelDropdown />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
`;

export default ChannelFilter;
