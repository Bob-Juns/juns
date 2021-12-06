// common action type
type Action = {
  type: string;
};

type CurrentUser = {
  userName: string;
  userId: string;
  userEmail: string;
  isAuth: boolean;
  isAdmin: boolean;
};

type AllUsers = CurrentUser[];

interface User {
  currentUser: CurrentUser;
  allUsers: AllUsers;
}

interface GetUsers extends Action {
  payload: Promise<AllUsers>;
}

interface CheckAuth extends Action {
  payload: Promise<CurrentUser>;
}

type UserAction = GetUsers | CheckAuth;

type LoginData = {
  userEmail: string;
  userPassword: string;
};

interface RegisterData extends LoginData {
  userName: string;
  userId: string;
}

type KakaoData = {
  userName: string;
  userId: string;
  userEmail: string;
};
