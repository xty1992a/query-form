import React from "react";
import {useServiceAction} from "../hooks";
import {Modal} from "antd";

enum FieldTypes {
  Input = 'Input',
  Picker = 'Picker',
  Checkbox = 'Checkbox',
  Date = 'Date',
  LinkPicker = 'LinkPicker',
}

interface Item<Form>{
  value: string|number;
  label: string;
  disabled?: boolean | ((form: Form) => boolean);
  [prop: string]: any;
}

interface Field<Form> {
  type: keyof FieldTypes;
  label: string;
  name: keyof Form;
  value: string | number | (number | string)[];
  visible?: boolean | ((form: Form) => boolean);
  options?: Item<Form>[];
}

interface QueryPayload<Form> {
  fields: Field<Form>[];
  formData: Form;
  validator: (form: Form) => Promise<{ valid: boolean; message?: string }>
  props: {
    modal: any;
    form: any;
  }
}

interface QueryFormProps<Form> extends React.Props<any> {
  payload:QueryPayload<Form>,
  resolve: Function;
}

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

  return <Modal>

  </Modal>;
}
