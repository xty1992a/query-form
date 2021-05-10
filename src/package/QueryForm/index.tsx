import React, {useMemo} from 'react';
import {useServiceAction, useFields} from "../hooks";
import {Modal} from "antd";

import {QueryPayload, QueryFormProps, FieldTypes} from '../../types';
import getComponent from '../components/Fields';
import './index.less'
import {dftModalProps} from '../consts'

export default function QueryForm<Form = {}>({payload, resolve}: QueryFormProps<Form>) {
  const {
    setData,
    data,
    onOk: _onOk,
    onCancel,
    visible,
    afterClose,
  } = useServiceAction<Form>({
    resolve: resolve,
    initialData: payload.formData
  });

  const {validator, fields: _fields} = payload;
  const [fields] = useFields({}, [_fields, data]);

  const onOk = async () => {
    if (validator) {
      const valid = await validator(data);
      if (!valid) return;
    }
    _onOk();
  };

  const onChange = (key: keyof Form) => (value: any) => {
    setData( {...data,[key]: value});
  };

  const setField = (field: Partial<Form>) => {
    setData({...data, ...field})
  }

  const modelProps = useMemo(() => {
    return {
      ...dftModalProps,
      ...(payload?.props?.modal ?? {})
    }
  }, [payload])

  return <Modal
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    afterClose={afterClose}
    {...modelProps}
  >
    <form action="" className="query-form">
      <fieldset className="query-form_fieldset">
        {
          fields.map(it => {
            const Item = getComponent(it.type);
            return <Item key={it.name} {...it} value={data[it.name]} onChange={onChange(it.name)}/>;
          })
        }
      </fieldset>
    </form>
  </Modal>;
}
