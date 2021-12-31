import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import {
  userReducer,
  getUsers,
  checkAuth,
  login,
  logout,
  emailConfirmation,
  register,
  linkKakao,
  deleteUser,
  updateAuthority,
  getFilteredUsers,
  updatePassword,
  updateProfile,
  updateEmail,
  resetPassword,
  withdraw,
  addToBookmark,
  removeFromBookmark,
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
  uploadBanner,
  deleteImage,
  getCover,
  resetCover,
  getBannerImage,
  resetBannerImage,
} from './modules/file';

import {
  bannerReducer,
  getBanners,
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  searchBanner,
} from './modules/banners';

import {
  detailReducer,
  getPlaylists,
  getPlaylist,
  getPlaylistItems,
  getVideo,
  resetDetail,
} from './modules/detail';

export const actions = {
  //users
  getUsers,
  checkAuth,
  login,
  logout,
  emailConfirmation,
  register,
  linkKakao,
  deleteUser,
  updateAuthority,
  getFilteredUsers,
  updatePassword,
  updateProfile,
  updateEmail,
  resetPassword,
  withdraw,
  addToBookmark,
  removeFromBookmark,

  //channels
  getChannels,
  getChannel,
  createChannel,
  deleteChannel,
  updateChannel,
  getFilteredChannels,
  getSearchedChannels,

  // menus
  selectDashboardMenu,
  selectCategoryMenu,
  selectAuthorityMenu,

  // files
  uploadCover,
  uploadBanner,
  deleteImage,
  getCover,
  resetCover,
  getBannerImage,
  resetBannerImage,

  // banners
  getBanners,
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  searchBanner,

  // playlist
  getPlaylists,
  getPlaylist,
  getPlaylistItems,
  getVideo,
  resetDetail,
};

const reducer = combineReducers({
  users: userReducer,
  channels: channelReducer,
  menus: menuReducer,
  file: fileReducer,
  banners: bannerReducer,
  details: detailReducer,
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
