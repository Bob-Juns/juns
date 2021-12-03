import axios from 'axios';
import axiosRequest from '@utils/axiosRequest';

const GET_USERS = 'get_users' as const;
const CHECK_AUTH = 'check_auth' as const;
const LOGIN = 'login' as const;
const LOGOUT = 'logout' as const;

const instance = axios.create({
  baseURL: '/api/user',
  withCredentials: true,
});

export const getUsers = () => {
  const payload = axiosRequest(instance, 'get', '/users');

  return {
    type: GET_USERS,
    payload,
  };
};

export const checkAuth = () => {
  const payload = axiosRequest(instance, 'get', '/auth');

  return {
    type: CHECK_AUTH,
    payload,
  };
};

export const login = (loginData: LoginData) => {
  const payload = axiosRequest(instance, 'post', '/login', loginData);

  return {
    type: LOGIN,
    payload,
  };
};

export const logout = () => {
  const payload = axiosRequest(instance, 'post', '/logout');

  return {
    type: LOGOUT,
    payload,
  };
};

const initialState: User = {
  currentUser: {
    userName: '',
    userId: '',
    userEmail: '',
    isAuth: false,
    isAdmin: false,
  },
  allUsers: [],
};

export const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };

    case CHECK_AUTH:
      return {
        ...state,
        currentUser: action.payload,
      };

    case LOGIN:
    case LOGOUT:
      return { ...state };

    default:
      return state;
  }
};
