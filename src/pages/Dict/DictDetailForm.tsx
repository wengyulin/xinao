import React, { Dispatch, useContext } from 'react';
import { Form, Input, Modal, notification, Select } from "antd";
import { FormComponentProps } from "antd/es/form";

import { DictContext } from "./context";
import { Action, DictAction } from "./types";
import { formItemLayout, status } from "./constants";
import { Dict } from './mode';
import { addDict, updateDict } from "./service";
import { GasResponse } from "../../types/GasResponse";

interface Props {
  dictForm: Dict;
  dispatch: Dispatch<Action>
}

const Item = Form.Item;
const TextArea = Input.TextArea;

const DictDetailForm: React.FC<Props & FormComponentProps> = ({form}) => {
  const {state, dispatch, getDictDetail} = useContext(DictContext);

  const handelCancel = () => {
    dispatch({
      type: DictAction.SET_DICT_MODAL,
      payload: {...state.dictModal, visible: false}
    })
  };

  const handleOk = () => {
    form.validateFields((error, values) => {
      if (!error) {
        if (state.dictModal.isEdit) {
          updateDict({...state.dictForm, ...values}).then(res => {
            addOrEditCbk(res as any as GasResponse);
          })
        } else {
          addDict({...values, parentCode: state.classifySelected.dictCode}).then(res => {
            addOrEditCbk(res as any as GasResponse);
          })
        }
      }
    });
  };

  const addOrEditCbk = (res: GasResponse) => {
    if (res.retCode === '000000') {
      notification.success({message: `${state.dictModal.isEdit ? '编辑' : '新增'}字典成功`});
      dispatch({
        type: DictAction.SET_DICT_MODAL,
        payload: {isEdit: false, visible: false}
      });
      getDictDetail();
    }
  };

  return (
    <Modal
      title={`${state.dictModal.isEdit ? '编辑' : '新增'}字典`}
      visible={state.dictModal.visible}
      onCancel={handelCancel}
      onOk={handleOk}
    >
      <Form {...formItemLayout}>
        <Item label="字典名称">
          {form.getFieldDecorator('dictName', {
            rules: [{required: true, message: '字典名称不能为空'}]
          })(
            <Input placeholder="请输入"/>
          )}
        </Item>

        <Item label="字典编码">
          {form.getFieldDecorator('dictCode', {
            rules: [{required: true, message: '字典编码不能为空'}]
          })(
            <Input disabled={state.dictModal.isEdit} placeholder="请输入"/>
          )}
        </Item>

        <Item label="显示顺序">
          {form.getFieldDecorator('displayIndex', {
            rules: [{required: true, message: '显示顺序不能为空'}]
          })(
            <Input placeholder="请输入"/>
          )}
        </Item>

        <Item label="状态">
          {form.getFieldDecorator('status', {
            rules: [{required: true, message: '状态不能为空'}]
          })(
            <Select placeholder="请选择">
              {status.map(sta => <Select.Option key={sta.value} value={sta.value}>{sta.label}</Select.Option>)}
            </Select>
          )}
        </Item>

        <Item label="描述">
          {form.getFieldDecorator('remark')(
            <TextArea placeholder="请输入"/>
          )}
        </Item>
      </Form>
    </Modal>
  )
};

const DictDetailWithForm = Form.create<Props & FormComponentProps>({
  mapPropsToFields(props) {
    const {dictForm} = props;
    return {
      dictName: Form.createFormField({value: dictForm.dictName}),
      dictCode: Form.createFormField({value: dictForm.dictCode}),
      displayIndex: Form.createFormField({value: dictForm.displayIndex}),
      status: Form.createFormField({value: dictForm.status}),
      remark: Form.createFormField({value: dictForm.remark})
    }
  },
  onValuesChange(props, changeValues) {
    props.dispatch({
      type: DictAction.SET_DICT_FORM,
      payload: {
        ...props.dictForm,
        ...changeValues
      }
    })
  }
})(DictDetailForm);

export { DictDetailWithForm as DictDetailForm };
