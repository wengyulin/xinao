import React, { useContext } from 'react';
import { Form, Input, Modal, notification } from 'antd';
import { FormComponentProps } from "antd/es/form";

import { DictClassify } from "./mode";
import { formItemLayout } from "./constants";
import { DictContext } from "./context";
import { DictAction } from "./types";
import { addDictClassify, updateDictClassify } from "./service";
import { GasResponse } from "../../types/GasResponse";

interface Props {
  classifyForm: DictClassify,
  dispatch: Function
}

const Item = Form.Item;
const TextArea = Input.TextArea;

const DictClassifyForm: React.FC<Props & FormComponentProps> = ({form}) => {
  const {state, dispatch, getDictClassifyList} = useContext(DictContext);

  const handleOk = () => {
    form.validateFields((error, values) => {
      if (!error) {
        if (state.classifyModal.isEdit) {
          updateDictClassify({...state.classifyForm, ...values}).then((res: any) => {
            editOrNewDictCall(res as GasResponse);
          })
        } else {
          addDictClassify(values).then((res: any) => {
            editOrNewDictCall(res as GasResponse);
          });
        }
      }
    })
  };

  const editOrNewDictCall = (res: GasResponse) => {
    if (res.retCode === '000000') {
      notification.success({message: '成功', description: `${state.classifyModal.isEdit ? '编辑' : '新增'}成功`});
      dispatch({
        type: DictAction.SET_CLASSIFY_MODAL,
        payload: { isEdit: false, visible: false }
      });
      getDictClassifyList();
    }
  };

  const handleCancel = () => {
    dispatch({type: DictAction.SET_CLASSIFY_MODAL, payload: {...state.classifyModal, visible: false}})
  };

  return (
    <Modal
      title={`${state.classifyModal.isEdit ? '编辑' : '新增'}字典类别`}
      visible={state.classifyModal.visible}
      onCancel={handleCancel}
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
            <Input disabled={state.classifyModal.isEdit} placeholder="请输入"/>
          )}
        </Item>

        <Item label="描述">
          {form.getFieldDecorator('remark')(
            <TextArea placeholder="请输入" />
          )}
        </Item>
      </Form>
    </Modal>
  )
};

const ClassifyWithForm = Form.create<Props & FormComponentProps>({
  mapPropsToFields: props => {
    return ({
      dictName: Form.createFormField({value: props.classifyForm.dictName}),
      dictCode: Form.createFormField({value: props.classifyForm.dictCode}),
      remark: Form.createFormField({value: props.classifyForm.remark})
    })
  },
  onValuesChange: (props, changedValues) => {
    props.dispatch({
      type: DictAction.SET_CLASSIFY_FORM,
      payload: {...props.classifyForm, ...changedValues}
    })
  }
})(DictClassifyForm);

export { ClassifyWithForm as ClassifyForm }
