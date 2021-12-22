import React from 'react';

import styled from 'styled-components';
import Page from '@components/Common/Layouts/Page';
import UpdateProfile from '@components/User/Setting/UpdateProfile';
import UpdatePassword from '@components/User/Setting/UpdatePassword';
import Withdraw from '@components/User/Setting/Withdraw';

const Setting = () => {
  return (
    <Page>
      <Container>
        <UpdateProfile />
        <UpdatePassword />
        <Withdraw />
      </Container>
    </Page>
  );
};

const Container = styled.div``;

export default Setting;
