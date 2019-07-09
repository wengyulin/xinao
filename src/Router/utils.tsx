import React from "react";
import { Route as RouteProps } from "./types";
import { AuthRoute } from "../components/AuthRoute";
import { Route } from "react-router";

export const loopRoute = (routeArr: Array<RouteProps>) => routeArr.map(({isAuth, name, component, ...rest}) => {
  return isAuth ?
    <AuthRoute key={name} component={component} {...rest} />
    : <Route key={name} component={component} {...rest}/>
});
