import { action } from 'typesafe-actions';

import { UserActionTypes, UserInfo } from "./types";

export const loginSuccess = (userInfo: UserInfo) => action(UserActionTypes.USER_LOGIN_SUCCESS, userInfo);
export const loginFail = (errMsg: string) => action(UserActionTypes.USER_LOGIN_FAIL, errMsg);
