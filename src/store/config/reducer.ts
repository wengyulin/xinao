import { ConfigActionTypes, ConfigState } from "./types";
import { Reducer } from "redux";

const initState: ConfigState = {
  theme: "light",
  loadingCount: 0
};

const configReducer: Reducer<ConfigState> = (state = initState, action) => {
  switch (action.type) {
    case ConfigActionTypes.CONFIG_SET_LOADING_COUNT:
      return {...state, loadingCount: action.payload};
    default:
      return state;
  }
};

export { configReducer };
