import React from 'react';

import styles from './Login.module.scss';
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
  return (
    <div className={styles.container}>
      <LoginForm  />
    </div>
  )
};

export { Login };
