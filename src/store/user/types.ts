export enum UserActionTypes {
  USER_LOGIN_FAIL = '@@user/USER_LOGIN_FAIL',
  USER_LOGIN_SUCCESS = '@@user/USER_LOGIN_SUCCESS',
  USER_LOGIN = '@@user/USER_LOGIN',
  USER_LOGOUT = '@@user/USER_LOGOUT'
}

export interface UserInfo {
  token?: string;
  username?: string;
}

export interface UserState {
  userInfo: UserInfo,
  loginFailMsg: string
}
