import React, { useEffect } from 'react';

import Page from '@components/Common/Layouts/Page';
import _Setting from '@components/User/Setting/Setting';

import useTitle from '@hooks/useTitle';

const Setting = () => {
  const changeTitle = useTitle();

  useEffect(() => {
    changeTitle('JUNSTREAMING | SETTING');
  }, []);
  return (
    <Page>
      <_Setting />
    </Page>
  );
};

export default Setting;
