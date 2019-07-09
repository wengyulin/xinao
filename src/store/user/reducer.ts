import { UserActionTypes, UserState } from "./types";
import { Reducer } from "redux";

const initState: UserState = {
  userInfo: {},
  loginFailMsg: '',
};

const userReducer: Reducer<UserState> = (state = initState, action) => {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN_SUCCESS:
      return {...state, userInfo: action.payload};
    case UserActionTypes.USER_LOGIN_FAIL:
      return {...state, loginFailMsg: action.payload};
    default:
      return state;
  }
};

export { userReducer };
