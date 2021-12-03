import React, { Dispatch } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { connect } from 'react-redux';
import { actions } from 'store';

type Props = {
  adminOnly?: boolean;
  checkAuth: () => any;
};

const PrivateRoute = ({ adminOnly = false, checkAuth }: Props) => {
  const isAuth = () => {
    return checkAuth().then(
      (response: { payload: { isAuth: boolean } }) => response.payload.isAuth,
    );
  };
  const isAdmin = () => {
    return checkAuth().then(
      (response: { payload: { isAdmin: boolean } }) => response.payload.isAdmin,
    );
  };

  return !isAuth() ? (
    <Navigate to="/login" />
  ) : !isAdmin() && adminOnly ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  checkAuth: () => dispatch(actions.checkAuth()),
});

export default connect(null, mapDispatchToProps)(PrivateRoute);
