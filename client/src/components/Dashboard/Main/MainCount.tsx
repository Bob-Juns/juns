import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MainCountCard from '@components/Dashboard/Main/MainCountCard';

type Props = {
  users: User;
  channels: Channel;
  banners: Banner;
};

const MainCount = ({ users, channels, banners }: Props) => {
  return (
    <Container>
      <MainCountCard title="users" count={users.allUsers?.length ?? 0} />
      <MainCountCard
        title="channels"
        count={channels.allChannels?.length ?? 0}
      />
      <MainCountCard title="banners" count={banners.allBanners?.length ?? 0} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-row-gap: 0.75rem;
  grid-column-gap: 0.375rem;
`;

const mapStateToProps = (state: {
  users: User;
  channels: Channel;
  banners: Banner;
}) => ({
  users: state.users,
  channels: state.channels,
  banners: state.banners,
});

export default connect(mapStateToProps)(MainCount);
