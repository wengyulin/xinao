import React from 'react';
import { createPortal } from "react-dom";
import { useDom } from "../../hooks";

interface Props {
  id?: string;
  children: React.ComponentType
}

const Portal: React.FC<Props> = ({id = 'root', children}) => {
  const dom = useDom(id);

  return createPortal(
    children,
    dom
  )
};

export { Portal };
