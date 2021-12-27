import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import SearchListItem from './SearchListItem';

type Props = {
  channels: Channel;
};

const SearchedList = ({ channels }: Props) => {
  return (
    <Container show={channels.searchedChannels.length > 0}>
      {channels.searchedChannels.length > 0 &&
        channels.searchedChannels.map((channel: CurrentChannel) => (
          <SearchListItem
            key={channel.channelId}
            category={channel.category}
            title={channel.channelTitle}
          />
        ))}
    </Container>
  );
};

const Container = styled.div<{ show: boolean }>`
  width: 100%;

  padding: 0.5rem;
  margin-top: 0.375rem;

  display: flex;
  flex-direction: column;

  position: absolute;
  top: 2rem;
  left: 0;

  background-color: #fff;

  box-shadow: ${(props) => props.theme.boxShadow.primary};
  border-radius: 0.375rem;

  transform: ${(props) =>
    props.show ? 'translateY(0)' : 'translateY(-0.375rem)'};
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  z-index: ${(props) => (props.show ? '990' : '-1')};

  transition: all 0.3s ease-in;
`;

const mapStateToProps = (state: { channels: Channel }) => ({
  channels: state.channels,
});

export default connect(mapStateToProps)(SearchedList);
