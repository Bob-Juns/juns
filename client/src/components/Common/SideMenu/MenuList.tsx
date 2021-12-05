import React from 'react';

import styled from 'styled-components';
import MenuItem from '@components/Common/SideMenu/MenuItem';

const MenuList = () => {
  return (
    <Container>
      <MenuItem title="메뉴 1" />
      <MenuItem title="메뉴 2" />
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 100%;
  padding: 0.375rem 1.25rem 1rem;
`;

export default MenuList;
