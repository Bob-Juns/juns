import React from 'react';

import styled from 'styled-components';

import BannerFilter from './BannerFilter/BannerFilter';
import BannerList from './BannerList/BannerList';

const Banner = () => {
  return (
    <Container>
      <BannerFilter />
      <BannerList />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default Banner;
