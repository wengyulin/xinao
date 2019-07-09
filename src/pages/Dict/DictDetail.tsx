import React, { useContext } from 'react';
import { Button, Divider, Icon, notification, Popconfirm, Table, Tooltip } from "antd";
import { PaginationConfig } from "antd/lib/pagination";

import { DictAction, dictDetailClickType } from "./types";
import { Dict } from './mode';
import { DictDetailForm } from './DictDetailForm';
import { DictContext } from "./context";
import { status } from "./constants";
import { deleteDict } from "./service";
import { GasResponse } from "../../types/GasResponse";
import styles from './Dict.module.scss';

interface Props {
}

const DictDetail: React.FC<Props> = () => {
  const {state, dispatch, getDictDetail} = useContext(DictContext);
  const columns = [
    {
      title: '编码',
      dataIndex: 'dictCode',
      width: 120
    },
    {
      title: '字典名称',
      dataIndex: 'dictName',
      width: 180,
      render: (text: string) => (
        <Tooltip title={text}>
          <span className={styles.remark}>{text}</span>
        </Tooltip>
      )
    },
    {
      title: '显示顺序',
      dataIndex: 'displayIndex',
      width: 120
    },
    {
      title: '状态',
      width: 120,
      render: (text: string, record: Dict) => {
        return status.filter(s => s.value === record.status)[0].label
      },
    },
    {
      title: '描述',
      dataIndex: 'remark',
      render: (text: string) => (
        <Tooltip title={text}>
          <span className={styles.remark}>{text}</span>
        </Tooltip>
      )
    },
    {
      title: '操作',
      width: 140,
      render: (text: string, record: Dict) => {
        return (
          <>
            <a href="javascript:void(0)" onClick={() => handleClick('edit', record)}>编辑</a>
            <Divider type='vertical'/>
            <Popconfirm title="确定要删除字典吗？" onConfirm={() => handleClick('delete', record)}>
              <a href="javascript:void(0)">删除</a>
            </Popconfirm>
          </>
        )
      }
    }
  ];

  const handleClick = (type: dictDetailClickType, dict: Dict = {}) => {
    switch (type) {
      case 'add':
        dispatch({
          type: DictAction.SET_DICT_MODAL,
          payload: { isEdit: false, visible: true }
        });
        dispatch({
          type: DictAction.SET_DICT_FORM,
          payload: {}
        });
        break;
      case 'edit':
        dispatch({
          type: DictAction.SET_DICT_MODAL,
          payload: { isEdit: true, visible: true }
        });
        dispatch({
          type: DictAction.SET_DICT_FORM,
          payload: dict
        });
        break;
      case 'delete':
        deleteDict(dict.dictId).then((res: any) => {
          if ((res as GasResponse).retCode === '000000') {
            notification.success({message: '删除成功'});
            getDictDetail();
          }
        });
        break;
    }
  };

  const handleTableChange = (pagination: PaginationConfig) => {
    const filter = {...state.dictFilter, pageNum: pagination.current || 1};
    dispatch({
      type: DictAction.SET_DICT_FILTER,
      payload: filter
    });
    getDictDetail(filter);
  };

  return (
    <div className={styles.dict}>
      <div className={styles.dictDetailTool}>
        <div className={styles.title}>字典明细</div>
        <Button size="small" type="primary" onClick={() => handleClick('add')}><Icon type="plus"/>添加</Button>
      </div>
      <Table
        pagination={{
          pageSize: state.dictFilter.pageSize,
          current: state.dictFilter.pageNum,
          total: state.dictFilter.total
        }}
        onChange={handleTableChange}
        bordered
        dataSource={state.dictList}
        rowKey="dictCode"
        columns={columns} />
      <DictDetailForm dictForm={state.dictForm} dispatch={dispatch} />
    </div>
  );
};

export { DictDetail };
