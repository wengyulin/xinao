import { action } from "typesafe-actions";

import { ConfigActionTypes } from "./types";

export const setConfigLoadingCount = (loadingCount: number) => action(ConfigActionTypes.CONFIG_SET_LOADING_COUNT, loadingCount);
