import React, { useEffect, useState } from 'react';
import ScrollBar from 'react-custom-scrollbars';
import { Menu } from "antd";
import { RouteComponentProps, withRouter } from "react-router";
import { SelectParam } from "antd/es/menu";

import { routes } from "../../Router/routes";
import { getMenus, getSelectKey } from "./utils";

interface Props extends RouteComponentProps {
}

const SideBar: React.FC<Props> = ({location}) => {
  const mainMenu = routes.filter(route => route.name === 'main')[0].routes || [];
  const [selectedKey, setSelectedKey] = useState(getSelectKey(mainMenu, '', location.pathname).split(','));

  const handleSelect = (selected: SelectParam) => {
    setSelectedKey(selected.selectedKeys)
  };

  useEffect(() => {
    setSelectedKey(getSelectKey(mainMenu, '', location.pathname).split(','));
  }, [location.pathname, mainMenu]);
  
  return (
    <ScrollBar>
      <Menu
        mode="inline"
        selectedKeys={selectedKey}
        onSelect={handleSelect}
      >
        {getMenus(mainMenu || [])}
      </Menu>
    </ScrollBar>
  )
};

const SideBarWithRouter = withRouter(SideBar);

export { SideBarWithRouter };
