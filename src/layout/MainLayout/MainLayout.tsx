import React from 'react';
import { Redirect, RouteComponentProps, Switch } from "react-router-dom";
import { Layout } from 'antd';

import styles from './MainLayout.module.scss';
import { SideBarWithRouter as SideBar } from "./SideBar";
import { Head } from "./Head";
import { getRoutes } from "./utils";
import { useSelector } from "react-redux";
import { AppState } from "../../store/rootReducers";

interface Props {
  routes: Array<any>
}

const {Header, Content, Sider} = Layout;

const MainLayout: React.FC<Props & RouteComponentProps> = ({routes}) => {
  const theme = useSelector((state: AppState) => state.config.theme);

  return (
    <Layout className={styles.container}>
      <Header>
        <Head/>
      </Header>
      <Layout>
        <Sider theme={theme}>
          <SideBar/>
        </Sider>
        <Content>
          <div className={styles.contentContainer}>
            <div className={styles.content}>
              <Switch>
                <Redirect to="/dict" from="/" exact/>
                {getRoutes(routes)}
              </Switch>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
};

export { MainLayout }
