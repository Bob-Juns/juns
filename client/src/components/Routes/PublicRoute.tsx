import React, { Dispatch } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { connect } from 'react-redux';
import { actions } from 'store';

type Props = {
  restricted?: boolean;
  checkAuth: () => any;
};

const PublicRoute = ({ restricted = false, checkAuth }: Props) => {
  const check = () => {
    return checkAuth().then(
      (response: { payload: { isAuth: boolean } }) => response.payload.isAuth,
    );
  };
  return check() && !restricted ? <Outlet /> : <Navigate to="/" />;
};

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  checkAuth: () => dispatch(actions.checkAuth()),
});

export default connect(null, mapDispatchToProps)(PublicRoute);
