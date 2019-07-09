import React from 'react';
import { Icon } from "antd";
import classnames from 'classnames';

import styles from './Dict.module.scss';
import { classifyClickType } from "./types";

interface Props {
  onClick(type: classifyClickType): void
}

interface ButtonProps {
  icon: string;
  label: string;
  type: classifyClickType;
  className?: string;
  onClick(type: classifyClickType): void
}

const Button: React.FC<ButtonProps> = ({onClick, icon, type, label, className}) => {
  return (
    <span className={classnames(styles.button, className)} onClick={() => onClick(type)}>
      <Icon className={styles.icon} type={icon} />
      {label}
    </span>
  )
};

const DictClassifyTool: React.FC<Props> = ({onClick}) => {
  return (
    <div className={styles.dictClassifyTool}>
      <div className={styles.title}>字典类别</div>
      <div>
        <Button onClick={onClick} type='add' icon="file-add" label="添加"/>
        <Button onClick={onClick} type='edit' icon="edit" label="编辑"/>
        <Button onClick={onClick} className={styles.buttonDelete} type='delete' icon="delete" label="删除"/>
      </div>
    </div>
  )
};

export { DictClassifyTool }
