import React, { Dispatch, useEffect } from 'react';

import { connect } from 'react-redux';
import { actions } from 'store';

import Page from '@components/Common/Layouts/Page';
import Search from '@components/Home/Search/Search';
import Banner from '@components/Home/Banner/Banner';
import HomeList from '@components/Home/HomeList/HomeList';

type Props = {
  channels: Channel;
  banners: Banner;
  getChannels: () => void;
  getBanners: () => void;
};

const Home = ({ channels, banners, getChannels, getBanners }: Props) => {
  useEffect(() => {
    channels.allChannels.length < 1 && getChannels();
    banners.allBanners.length < 1 && getBanners();
  }, [channels.allChannels, banners.allBanners]);

  return (
    <Page>
      <Search />
      <Banner />
      <HomeList />
    </Page>
  );
};

const mapStateToProps = (state: { channels: Channel; banners: Banner }) => ({
  channels: state.channels,
  banners: state.banners,
});

const mapDispatchToProps = (
  dispatch: Dispatch<ChannelAction | BannerAction>,
) => ({
  getChannels: () => dispatch(actions.getChannels()),
  getBanners: () => dispatch(actions.getBanners()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
