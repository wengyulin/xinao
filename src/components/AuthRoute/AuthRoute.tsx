import React from 'react';
import { Redirect, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import { AppState } from "../../store/rootReducers";

const AuthRoute = ({component, isExact, location, routes, ...rest} : any) => {
  const userInfo = useSelector((state: AppState) => state.user.userInfo);
  const renderRoute = (props: any) => userInfo.token
    ? React.createElement(component, {...props, routes})
    : <Redirect to={{pathname: '/login', state: {from: location}}}/>;

  return <Route exact={isExact} {...rest} render={renderRoute} />
};

export { AuthRoute };
