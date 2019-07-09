import axios, { AxiosResponse, AxiosError } from 'axios';
import { notification } from 'antd';

import { store } from "../store";
import { GasResponse } from "../types/GasResponse";
import { setConfigLoadingCount } from "../store/config/action";

const defaultInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
  timeout: 5000,
});

defaultInstance.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${store.getState().user.userInfo.token}`
  };
  store.dispatch(setConfigLoadingCount(store.getState().config.loadingCount + 1));
  return config;
}, error => {
  return Promise.reject(error)
});

defaultInstance.interceptors.response.use((res: AxiosResponse<GasResponse>): any => {
  store.dispatch(setConfigLoadingCount(store.getState().config.loadingCount - 1));
  if (res.status === 200) {
    const gasRes = res.data as GasResponse;
    switch (gasRes.retCode) {
      case '000000':
        return gasRes;
      default:
        notification.error({message: '错误', description: gasRes.retMsg});
        return gasRes;
    }
  }

}, (err: AxiosError) => {
  notification.error({message: '服务器错误', description: JSON.stringify(err.response)});
  store.dispatch(setConfigLoadingCount(store.getState().config.loadingCount - 1));
  return Promise.reject(err);
});

export { defaultInstance as fetch };
