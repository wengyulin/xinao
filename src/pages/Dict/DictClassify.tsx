import React, { useContext } from 'react';
import { notification, Table, Modal } from "antd";
import classnames from 'classnames';
import ScrollBar from 'react-custom-scrollbars';

import { DictClassifyTool } from "./DictClassifyTool";
import { classifyClickType, DictAction } from "./types";
import { DictContext } from "./context";
import { ClassifyForm } from "./DictClassifyForm";
import { DictClassify as DictClassifyMode } from "./mode";
import { deleteDictClassify } from "./service";
import styles from './Dict.module.scss';

const DictClassify: React.FC = () => {
  const {state, dispatch, getDictClassifyList} = useContext(DictContext);

  const columns = [
    {
      title: '编码',
      dataIndex: 'dictCode'
    },
    {
      title: '字典名称',
      dataIndex: 'dictName'
    },
    {
      title: '描述',
      dataIndex: 'remark'
    }
  ];

  const handleClick = (type: classifyClickType) => {
    switch (type) {
      case 'add':
        dispatch({
          type: DictAction.SET_CLASSIFY_MODAL,
          payload: { isEdit: false, visible: true }
        });
        dispatch({
          type: DictAction.SET_CLASSIFY_FORM,
          payload: {}
        });
        break;
      case 'edit':
        dispatch({
          type: DictAction.SET_CLASSIFY_MODAL,
          payload: { isEdit: true, visible: true }
        });
        dispatch({
          type: DictAction.SET_CLASSIFY_FORM,
          payload: state.classifySelected
        });
        break;
      case 'delete':
        deleteClassify();
        break;
    }
  };

  const selectRow = (record: DictClassifyMode) => {
    return record.dictCode === state.classifySelected.dictCode ? classnames(styles.tableRowSelect, styles.tableRow) : styles.tableRow;
  };

  const handleSelect = (record: DictClassifyMode) => {
    dispatch({
      type: DictAction.SET_CLASSIFY_SELECTED,
      payload: record
    });
  };

  const deleteClassify = () => {
    Modal.confirm({
      title: '确定要删除字典类别吗？',
      content: '删除后，其类下所有字典明细同时删除',
      okType: 'danger',
      onOk() {
        deleteDictClassify(state.classifySelected.dictId).then((res: any) => {
          if (res.retCode === '000000') {
            notification.success({message: '删除成功'});
            getDictClassifyList(true);
          } else {
            notification.error({message: res.retMsg})
          }
        });
      },
    });
  };

  return (
    <>
      <DictClassifyTool onClick={handleClick}/>
      <div className={styles.dictClassify}>
        <ScrollBar>
          <Table
            rowClassName={selectRow}
            rowKey="dictId"
            bordered
            pagination={false}
            columns={columns}
            onRow={(record: DictClassifyMode) => ({
              onClick: () => handleSelect(record)
            })}
            dataSource={state.classifyList}/>
        </ScrollBar>
      </div>
      <ClassifyForm classifyForm={state.classifyForm} dispatch={dispatch}/>
    </>
  )
};

export { DictClassify };
