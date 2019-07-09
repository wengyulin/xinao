import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Icon, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { FormComponentProps } from "antd/lib/form";

import styles from './Login.module.scss'
import { UserActionTypes } from "../../store/user/types";
import { AppState } from "../../store/rootReducers";

const Item = Form.Item;

const LoginForm: React.FC<FormComponentProps & RouteComponentProps> = ({ form, history }) => {
  const dispatch = useDispatch();
  const failMsg = useSelector((state: AppState) => state.user.loginFailMsg);
  const [isLoading, setLoading] = useState(false);

  const login = () => {
    form.validateFields((error, values) => {
      if (!error) {
        setLoading(true);

        dispatch({
          type: UserActionTypes.USER_LOGIN,
          payload: {
            username: values.username,
            password: values.password,
          },
          resolve: () => {
            history.push('/');
            setLoading(false);
          }
        })
      }
    })
  };

  useEffect(() => {
    const handleLogin = (e: KeyboardEvent) => {
      console.log(e.code);
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        login();
      }
    };

    window.addEventListener('keypress', handleLogin);
    return () =>  window.removeEventListener('keypress', handleLogin);
  }, [login]);

  return (
    <div className={styles.login}>
      <h1 className={styles.loginTitle}>气源管理系统</h1>

      {failMsg && <Alert message={failMsg} type="error" />}

      <Item>
        {form.getFieldDecorator('username', {
          rules: [{required: true, message: '应户名不能为空'}]
        })(
          <Input prefix={<Icon type="user" />} placeholder="请输入用户名"/>
        )}
      </Item>

      <Item>
        {form.getFieldDecorator('password', {
          rules: [{required: true, message: '密码不能为空'}]
        })(
          <Input type="password" prefix={<Icon type="lock" />} placeholder="请输入用户密码"/>
        )}
      </Item>

      <Button loading={isLoading} block type="primary" size="large" onClick={login}>登录</Button>
    </div>
  )
};

export default withRouter(Form.create<FormComponentProps & RouteComponentProps>()(LoginForm));
