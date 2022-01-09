import React, { useEffect } from 'react';
import LoginForm from '@components/User/Login/LoginForm';

import useTitle from '@hooks/useTitle';

const Login = () => {
  const changeTitle = useTitle();

  useEffect(() => {
    changeTitle('JUNSTREAMING | LOGIN');
  }, []);
  return <LoginForm />;
};

export default Login;
