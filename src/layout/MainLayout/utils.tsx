import React from 'react';
import { Icon, Menu } from "antd";
import { Link, Route } from "react-router-dom";

import { Route as RouteProps } from "../../Router/types";
import { AuthRoute } from "../../components/AuthRoute";

const { Item, SubMenu } = Menu;

/**
 * 递归 MainLayout 布局下的 Route
 * @param routes
 * @param parentPath
 */
export const getRoutes = (routes: Array<RouteProps>, parentPath = ''): Array<any> => {

  let temp: Array<any> = [];

  const loop = (routeArr: Array<RouteProps>, parent: string) => {
    routeArr.forEach(({name, path, component, isAuth, routes, isDisable, ...rest}) => {
      if (component && !isDisable) {
        temp.push(
          isAuth ?
            <AuthRoute key={name} {...rest} path={`${parent}${path}`} component={component}/> :
            <Route key={name} {...rest} path={`${parentPath}${path}`} component={component}/>
        )
      }
      if (Array.isArray(routes)) {
        loop(routes, `${parentPath}${path}`)
      }
    })
  };

  loop(routes, parentPath);

  return temp;
};

/**
 * 递归 SideBar 的 Menu 菜单
 * @param menus
 * @param parentPath
 */
export const getMenus = (menus: Array<RouteProps>, parentPath = ''): Array<any> => menus.map(menu => {
  if (menu.component && !menu.isDisable) {
    return (
      <Item key={menu.name}>
        <Link to={`${parentPath}${menu.path}`}>
          {menu.icon && <Icon type={menu.icon} />}
          {menu.label}
        </Link>
      </Item>
    )
  }
  if (Array.isArray(menu.routes)) {
    return (
      <SubMenu key={menu.name} title={<>{menu.icon && <Icon type={menu.icon} />}{menu.label}</>}>
        {getMenus(menu.routes, `${parentPath}${menu.path}`)}
      </SubMenu>
    )
  }
});

/**
 * 递归获取已选择的菜单 Key
 * @param menus
 * @param parentKey
 * @param path
 */
export const getSelectKey = (menus: Array<RouteProps>, parentKey: '', path: string): string => {
  let selectKey = '';

  const loop = (menuArr: Array<RouteProps>, parentKey: string) => {
    for (let i = 0; i < menuArr.length; i++) {
      if (menuArr[i].path === path) {
        selectKey = parentKey ? `${parentKey}, ${menuArr[i].name}` : `${menuArr[i].name}`;
        break;
      }
      if (Array.isArray(menuArr[i].routes)) {
        loop(menuArr[i].routes || [], `${parentKey}, ${menuArr[i].name}`)
      }
    }
  };

  loop(menus, parentKey);

  return selectKey;

};
