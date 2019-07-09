import React from 'react';
import {Card, Table} from 'antd';
const Roles = () => {
    const dataSource = [
      {
        id: '0001',
        Charactername: '系统管理员',
        tongyong: '是',
        ApplicationOrganization: '全部',
        juese: 'aaa',
        caozuo: '编辑|角色授权|删除',
      },
      {
        id: '0002',
        Charactername: '气源采购',
        tongyong: '是',
        ApplicationOrganization: '全部',
        juese: 'aaa',
        caozuo: '编辑|角色授权|删除',
      },
      {
        id: '0003',
        Charactername: '气源跟踪',
        tongyong: '是',
        ApplicationOrganization: '全部',
        juese: 'aaa',
        caozuo: '编辑|角色授权|删除',
      },
      {
        id: '0004',
        Charactername: '结算校核',
        tongyong: '是',
        ApplicationOrganization: '全部',
        juese: 'aaa',
        caozuo: '编辑|角色授权|删除',
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
          dataIndex: 'caozuo',
        }
];
return (
  <>
    <div>
      <Card title="基础表格">
        <Table
          bordered
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
      </Card>
    </div>
  </>
);

}



export {Roles};
