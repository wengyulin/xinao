import { Route } from "./types";

import { MainLayout } from "../layout/MainLayout";
import { Login } from "../pages/Login";
import { Error } from "../pages/Error";
import { Dict } from "../pages/Dict";
import { Roles } from "../pages/Roles";

const routes: Array<Route> = [
  {
    name: 'login',
    path: '/login',
    component: Login,
    isAuth: false,
  },
  {
    name: 'main',
    path: '/',
    component: MainLayout,
    isAuth: true,
    isExact: true,
    routes: [
      {
        name: 'roles',
        label: '角色管理',
        path: '/roles',
        component: Roles,
        isAuth: true,
        icon: 'snippets'
      },
      {
        name: 'dict',
        path: '/dict',
        label: '字典管理',
        component: Dict,
        isAuth: true,
        icon: 'user'
      },
      {
        name: 'error',
        path: '',
        component: Error,
        isAuth: false,
        isDisable: true
      }
    ]
  },
];

export { routes }