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
  deleteUser,
  updateAuthority,
  getFilteredUsers,
  getSearchedUsers,
  updatePassword,
  updateProfile,
  resetPassword,
  withdraw,
} from './modules/users';

import {
  channelReducer,
  getChannels,
  getChannel,
  createChannel,
  deleteChannel,
  updateChannel,
  getFilteredChannels,
  getSearchedChannels,
  getChannelIntersection,
} from './modules/channels';

import {
  menuReducer,
  selectDashboardMenu,
  selectCategoryMenu,
  selectAuthorityMenu,
} from './modules/menus';

import {
  fileReducer,
  uploadCover,
  deleteCover,
  getCover,
  resetCover,
} from './modules/file';

export const actions = {
  //users
  getUsers,
  checkAuth,
  login,
  logout,
  registerConfirmation,
  register,
  linkKakao,
  deleteUser,
  updateAuthority,
  getFilteredUsers,
  getSearchedUsers,
  updatePassword,
  updateProfile,
  resetPassword,
  withdraw,

  //channels
  getChannels,
  getChannel,
  createChannel,
  deleteChannel,
  updateChannel,
  getFilteredChannels,
  getSearchedChannels,
  getChannelIntersection,

  // menus
  selectDashboardMenu,
  selectCategoryMenu,
  selectAuthorityMenu,

  // files
  uploadCover,
  deleteCover,
  getCover,
  resetCover,
};

const reducer = combineReducers({
  users: userReducer,
  channels: channelReducer,
  menus: menuReducer,
  file: fileReducer,
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
