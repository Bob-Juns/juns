import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import {
  userReducer,
  getUsers,
  checkAuth,
  login,
  logout,
} from './modules/users';
import { categoryReducer, selectCategory } from './modules/category';

export const actions = {
  //users
  getUsers,
  checkAuth,
  login,
  logout,

  //category
  selectCategory,
};

const reducer = combineReducers({
  users: userReducer,
  categories: categoryReducer,
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
