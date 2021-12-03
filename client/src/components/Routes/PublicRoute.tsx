import React, { Dispatch } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import { connect } from 'react-redux';
import { actions } from 'store';

type Props = {
  restricted?: boolean;
  checkAuth: () => any;
};

const PublicRoute = ({ restricted = false, checkAuth }: Props) => {
  const navigate = useNavigate();

  const check = () => {
    return checkAuth().then((response: { payload: { isAuth: boolean } }) => {
      response.payload.isAuth && restricted && navigate('/', { replace: true });
    });
  };

  return check() && <Outlet />;
};

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  checkAuth: () => dispatch(actions.checkAuth()),
});

export default connect(null, mapDispatchToProps)(PublicRoute);
