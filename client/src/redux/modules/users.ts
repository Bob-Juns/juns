import axios from 'axios';
import axiosRequest from '@utils/axiosRequest';

const GET_USERS = 'get_users' as const;
const CHECK_AUTH = 'check_auth' as const;
const LOGIN = 'login' as const;
const LOGOUT = 'logout' as const;
const REGISTER_CONFIRMATION = 'register_confirmation' as const;
const REGISTER = 'register' as const;
const LINK_KAKAO = 'link_kakao' as const;

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

export const registerConfirmation = (userEmail: {
  userEmail: string;
  location: string;
}) => {
  const payload = axiosRequest(instance, 'post', '/confirmation', userEmail);

  return {
    type: REGISTER_CONFIRMATION,
    payload,
  };
};

export const register = (registerData: RegisterData) => {
  const payload = axiosRequest(instance, 'post', '/register', registerData);

  return {
    type: REGISTER,
    payload,
  };
};

export const linkKakao = (kakaoData: KakaoData) => {
  const payload = axiosRequest(instance, 'post', '/kakao', kakaoData);

  return {
    type: LINK_KAKAO,
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
    case REGISTER_CONFIRMATION:
    case REGISTER:
    case LINK_KAKAO:
      return { ...state };

    case LOGOUT:
      return {
        ...state,
        currentUser: initialState.currentUser,
      };

    default:
      return state;
  }
};
