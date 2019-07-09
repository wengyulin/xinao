import React from 'react';
import { Link } from "react-router-dom";
import { Dropdown, Icon, Menu } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/rootReducers";
import styles from './MainLayout.module.scss';
import { UserActionTypes } from "../../store/user/types";

const Head: React.FC = () => {
  const userInfo = useSelector((state: AppState) => state.user.userInfo);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({
      type: UserActionTypes.USER_LOGOUT
    })
  };

  const dropMenu = (
    <Menu>
      <Menu.Item onClick={logout}><Icon type="logout" />退出</Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="./images/logo.png" alt="logo" />
          气源管理系统后台
        </Link>
      </div>

      <div className={styles.user}>
        欢迎您:
        <Dropdown overlay={dropMenu}>
          <a href="javascript:void(0)" className={styles.dropDown}>
            {userInfo.username} <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    </div>
  )
};

export { Head }
