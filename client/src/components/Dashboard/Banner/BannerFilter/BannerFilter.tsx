import React from 'react';

import styled from 'styled-components';
import BannerCreateButton from './BannerCreateButton';
import BannerSearch from './BannerSearch';

const BannerFilter = () => {
  return (
    <Container>
      <BannerCreateButton />
      <BannerSearch />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default BannerFilter;
