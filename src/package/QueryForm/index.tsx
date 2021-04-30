import React from 'react'
import {useServiceAction} from "../hooks";
import {Modal} from "antd";

import {QueryPayload, QueryFormProps, FieldTypes} from '../../types'

export default function QueryForm<Form={}>(props: QueryFormProps<Form>) {
  const {
    setData,
    data,
    onOk: _onOk,
    onCancel,
    visible,
    afterClose,
  } = useServiceAction<Form>({
    resolve: props.resolve,
    initialData: props.payload.formData
  });

  const {validator} = props.payload

  const onOk = async () => {
    if(validator) {
      const valid = await validator(data)
      if (!valid) return
    }
    _onOk()
  }

  return <Modal
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    afterClose={afterClose}
  >
    <p>hello world</p>
  </Modal>;
}
