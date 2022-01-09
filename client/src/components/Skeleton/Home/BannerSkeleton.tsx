import React from 'react';

import styled from 'styled-components';

const BannerSkeleton = () => {
  return <Rect />;
};

const Rect = styled.div`
  width: 100%;
  height: 0;
  padding-top: 50%;
  background-color: ${(props) => props.theme.color.gray.base};
`;

export default BannerSkeleton;
