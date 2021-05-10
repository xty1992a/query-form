import React from 'react';
import {useServiceAction, useFields} from "../hooks";
import {Modal} from "antd";

import {FormContentProps, StaticField, Form as _Form} from '../../types';
import getComponent from "../components/Fields";

export default function FormContent<Form = _Form>(props: FormContentProps<Form>) {
  const {formData, fields, setField} = props;

  const onChange = (key: keyof Form) => (value: Form[keyof Form]) => {
    setField({[key]: value});
  };

  return (<div>
    {
      fields.map((it) => {
        const Item = getComponent<Form>(it.type);
        return <Item key={it.name as string} {...it} value={formData[it.name]} onChange={onChange(it.name)}/>;
      })
    }
  </div>);
}
