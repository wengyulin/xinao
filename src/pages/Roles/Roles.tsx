import React from 'react';
import {Card, Table, Input, Divider, Row, Col, Button} from 'antd';
import styless from './Roles.module.scss';
const Roles = () => {
  const dataSource = [
    {
      id: '0001',
      Charactername: '系统管理员',
      tongyong: '是',
      ApplicationOrganization: '全部',
      juese: 'aaa',
    },
    {
      id: '0002',
      Charactername: '气源采购',
      tongyong: '是',
      ApplicationOrganization: '全部',
      juese: 'aaa',
    },
    {
      id: '0003',
      Charactername: '气源跟踪',
      tongyong: '是',
      ApplicationOrganization: '全部',
      juese: 'aaa',
    },
    {
      id: '0004',
      Charactername: '结算校核',
      tongyong: '是',
      ApplicationOrganization: '全部',
      juese: 'aaa',
    },
  ];
  const columns = [
    {
      title: '角色ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '角色名称',
      key: 'Charactername',
      dataIndex: 'Charactername',
    },
    {
      title: '是否通用',
      key: 'tongyong',
      dataIndex: 'tongyong',
    },
    {
      title: '应用组织',
      key: 'ApplicationOrganization',
      dataIndex: 'ApplicationOrganization',
    },
    {
      title: '角色描述',
      key: 'juese',
      dataIndex: 'juese',
    },
    {
      title: '操作',
      key: 'caozuo',
      dataIndex: '操作',
      render: (record: any) => (
        <span>
          <a href="javascript:;" onClick={() => console.log('我被点击了')}>
            编辑
          </a>
          <Divider type="vertical" />
          <a href="javascript:;">角色授权</a>
          <Divider type="vertical" />
          <a href="javascript:;" style={{color: 'red'}}>
            删除
          </a>
        </span>
      ),
    },
  ];

  // const handleClick = (type: classifyClickType) => {
  //   switch (type) {
  //     case 'add':
  //       dispatch({
  //         type: DictAction.SET_CLASSIFY_MODAL,
  //         payload: {isEdit: false, visible: true},
  //       });
  //       dispatch({
  //         type: DictAction.SET_CLASSIFY_FORM,
  //         payload: {},
  //       });
  //       break;
  //     case 'edit':
  //       dispatch({
  //         type: DictAction.SET_CLASSIFY_MODAL,
  //         payload: {isEdit: true, visible: true},
  //       });
  //       dispatch({
  //         type: DictAction.SET_CLASSIFY_FORM,
  //         payload: state.classifySelected,
  //       });
  //       break;
  //     case 'delete':
  //       deleteClassify();
  //       break;
  //   }
  // };

  return (
    <>
      <div>
        <Card>
          <Row gutter={16}>
            <Col span={4}>
              <span style={{display: 'inline-block'}}>角色名称/编码：</span>
              <Input className={styless.contents} />
            </Col>
            <Col>
              <Button type="primary" className={styless.btns}>
                搜索
              </Button>
            </Col>
          </Row>

          <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            size="middle"
          />
        </Card>
      </div>
    </>
  );
};

export {Roles};
