import React, { useEffect } from 'react';
import RegisterForm from '@components/User/Register/RegisterForm';

import useTitle from '@hooks/useTitle';

const Register = () => {
  const changeTitle = useTitle();

  useEffect(() => {
    changeTitle('JUNSTREAMING | REGISTER');
  }, []);
  return <RegisterForm />;
};

export default Register;
