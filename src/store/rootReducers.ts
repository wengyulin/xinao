import { combineReducers } from "redux";

import { userReducer } from "./user/reducer";
import { configReducer } from "./config/reducer";
import { UserState } from "./user/types";
import { ConfigState } from "./config/types";

export interface AppState {
  user: UserState,
  config: ConfigState
}

export const rootReducers = combineReducers({
  user: userReducer,
  config: configReducer
});
