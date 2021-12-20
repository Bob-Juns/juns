type CurrentUser = {
  userName: string;
  userId: string;
  userEmail: string;
  registerWith: string;
  bookmark: CurrentChannel[];
  isAuth: boolean;
  isAdmin: boolean;
};

type AllUsers = CurrentUser[];

interface User {
  currentUser: CurrentUser;
  allUsers: AllUsers;
  filteredUsers: AllUsers;
  searchedUsers: AllUsers;
}

interface GetUsers extends Action {
  payload: Promise<AllUsers>;
}

interface CheckAuth extends Action {
  payload: Promise<CurrentUser>;
}

interface GetFilteredUsers extends Action {
  payload: string | boolean;
}

type GetSearchedUsers = GetFilteredUsers;

type UserAction = GetUsers | CheckAuth | GetFilteredUsers | GetSearchedUsers;

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
