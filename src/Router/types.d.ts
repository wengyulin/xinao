import React from 'react';

export interface Route {
  component?: React.FC<any, any>;
  path: string;
  name: string;
  label?: string;
  icon?: string;
  isAuth: boolean;
  isDisable?: boolean;
  isExact?: boolean;
  routes?: Array<Route>
}
