import React from 'react';

import { connect } from 'react-redux';

import Page from '@components/Common/Layouts/Page';
import _Setting from '@components/User/Setting/Setting';

const Setting = () => {
  return (
    <Page>
      <_Setting />
    </Page>
  );
};

export default Setting;
