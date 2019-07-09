import React from 'react';

import { Router } from "./Router";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { AppState } from "./store/rootReducers";
import styles from './App.module.scss';

const App: React.FC = () => {
  const loadingCount = useSelector((state: AppState) => state.config.loadingCount);

  return (
    <div>
      <Router />
      <div className={styles.spin}>
        <Spin spinning={loadingCount !== 0} size="large" />
      </div>
    </div>
  );
};

export default App;
