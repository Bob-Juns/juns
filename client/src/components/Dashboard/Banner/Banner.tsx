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
  margin-top: 6.75rem;
  padding: 1rem 0.5rem;

  ${(props) =>
    props.theme.device('tablet')(`
  margin-top: 7.75rem;
  `)}
`;

export default Banner;
