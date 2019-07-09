import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import zhCN from 'antd/es/locale-provider/zh_CN';

import { persistor, store } from "./store";
import './styles/core.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { LocaleProvider } from "antd";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <LocaleProvider locale={zhCN}>
        <App />
      </LocaleProvider>
    </PersistGate>
  </Provider>
  , document.getElementById('root'));

serviceWorker.register();
