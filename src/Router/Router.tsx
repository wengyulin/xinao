import React from 'react';
import { Switch, HashRouter } from "react-router-dom";

import { routes } from "./routes";
import { loopRoute } from "./utils";

const Router: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        {loopRoute(routes)}
      </Switch>
    </HashRouter>
  )
};

export { Router };

