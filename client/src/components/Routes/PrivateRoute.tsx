import React, { Dispatch } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import { connect } from 'react-redux';
import { actions } from 'store';

type Props = {
  adminOnly?: boolean;
  checkAuth: () => any;
};

const PrivateRoute = ({ adminOnly = false, checkAuth }: Props) => {
  const navigate = useNavigate();

  const check = () => {
    return checkAuth().then(
      (response: { payload: { isAuth: boolean; isAdmin: boolean } }) => {
        !response.payload.isAuth
          ? navigate('/login', { replace: true })
          : !response.payload.isAdmin &&
            adminOnly &&
            navigate('/', { replace: true });
      },
    );
  };

  return check() && <Outlet />;
};

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  checkAuth: () => dispatch(actions.checkAuth()),
});

export default connect(null, mapDispatchToProps)(PrivateRoute);
