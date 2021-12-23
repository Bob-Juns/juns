import axios from 'axios';
import axiosRequest from '@utils/axiosRequest';

const GET_USERS = 'get_users' as const;
const CHECK_AUTH = 'check_auth' as const;
const LOGIN = 'login' as const;
const LOGOUT = 'logout' as const;
const REGISTER_CONFIRMATION = 'register_confirmation' as const;
const REGISTER = 'register' as const;
const LINK_KAKAO = 'link_kakao' as const;
const DELETE = 'delete' as const;
const AUTHORITY = 'authority' as const;
const GET_FILTERED_USER = 'get_filtered_user' as const;
const GET_SEARCHED_USERS = 'get_searched_users' as const;
const GET_FILTERED_USERS = 'get_filtered_users' as const;
const UPDATE_PASSWORD = 'update_password' as const;
const UPDATE_PROFILE = 'update_profile' as const;
const RESET_PASSWORD = 'reset_password' as const;
const WITHDRAW = 'withdraw' as const;

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

export const updateAuthority = (userEmail: string, isAdmin: boolean) => {
  const payload = axiosRequest(
    instance,
    'put',
    `/update-authority/${userEmail}`,
    {
      isAdmin,
    },
  );

  return {
    type: AUTHORITY,
    payload,
  };
};

export const deleteUser = (userEmail: string) => {
  const payload = axiosRequest(instance, 'delete', `delete/${userEmail}`);

  return {
    type: DELETE,
    payload,
  };
};

export const getFilteredUsers = (payload: FilterState) => {
  return {
    type: GET_FILTERED_USERS,
    payload,
  };
};

export const updatePassword = (userPassword: string, newPassword: string) => {
  const payload = axiosRequest(instance, 'put', '/update-password', {
    userPassword,
    newPassword,
  });

  return {
    type: UPDATE_PASSWORD,
    payload,
  };
};

export const updateProfile = (userName: string) => {
  const payload = axiosRequest(instance, 'put', '/update-profile', {
    userName,
  });

  return {
    type: UPDATE_PROFILE,
    payload,
  };
};

export const resetPassword = (userEmail: string) => {
  const payload = axiosRequest(instance, 'post', '/reset-password', {
    userEmail,
  });

  return {
    type: RESET_PASSWORD,
    payload,
  };
};

export const withdraw = () => {
  const payload = axiosRequest(instance, 'delete', '/withdraw');

  return {
    type: WITHDRAW,
    payload,
  };
};

const initialState: User = {
  currentUser: {
    userName: '',
    userId: '',
    userEmail: '',
    registerWith: '',
    bookmark: [],
    isAuth: false,
    isAdmin: false,
  },
  allUsers: [],
  filteredUsers: [],
};

export const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
        filteredUsers: action.payload,
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
    case AUTHORITY:
    case DELETE:
    case UPDATE_PASSWORD:
    case UPDATE_PROFILE:
    case RESET_PASSWORD:
    case WITHDRAW:
      return { ...state };

    case LOGOUT:
      return {
        ...state,
        currentUser: initialState.currentUser,
      };

    case GET_FILTERED_USERS:
      return {
        ...state,
        filteredUsers:
          action.payload.filter === '권한'
            ? state.allUsers.filter((user: CurrentUser) => {
                return (
                  (user.userName.match(action.payload.query.toString()) ||
                    user.userId.match(action.payload.query.toString()) ||
                    user.userEmail.match(action.payload.query.toString())) &&
                  (user.userName.match(action.payload.query.toString()) ||
                    user.userId.match(action.payload.query.toString()) ||
                    user.userEmail.match(action.payload.query.toString()))
                );
              })
            : state.allUsers
                .filter(
                  (user: CurrentUser) => user.isAdmin === action.payload.filter,
                )
                .filter((user: CurrentUser) => {
                  return (
                    user.userName.match(action.payload.query.toString()) ||
                    user.userId.match(action.payload.query.toString()) ||
                    user.userEmail.match(action.payload.query.toString())
                  );
                }),
      };

    default:
      return state;
  }
};
