import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import {
  userReducer,
  getUsers,
  checkAuth,
  login,
  logout,
  registerConfirmation,
  register,
  linkKakao,
} from './modules/users';

export const actions = {
  //users
  getUsers,
  checkAuth,
  login,
  logout,
  registerConfirmation,
  register,
  linkKakao,
};

const reducer = combineReducers({
  users: userReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  process.env.NODE_ENV !== 'production'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(promiseMiddleware, thunk)),
);
export default store;
