import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as hooks from "../hooks";
import { Modal } from "antd";

import { QueryPayload, QueryFormProps, FieldTypes } from "../../types";
import getComponent from "../components/Fields";
import "./index.less";
import { dftModalProps } from "../consts";
import FormContent from "./FormContent";

export default function QueryForm<Form = {}>({
  payload,
  resolve,
}: QueryFormProps<Form>) {
  const { validator, fields: _fields } = payload;
  const {
    setData,
    data,
    onOk: _onOk,
    onCancel,
    visible,
    afterClose,
  } = hooks.useServiceAction<Form>({
    resolve: resolve,
    initialData: payload.formData,
  });
  const [fields] = hooks.useFields({}, [_fields, data]);
/*  const { valid, validate, errorMap } = hooks.useValidate<Form>({ validator }, [
    data,
  ]);*/

  // 点击确定,先校验
/*  const onOk = useCallback(async () => {
    const valid = await validate();
    if (!valid) return;
    _onOk();
  }, [validate]);*/

  const onOk = () => {

  }


  const onChange = (key: keyof Form) => (value: any) => {
    setData({ ...data, [key]: value });
  };

  // 聚合modal的属性
  const modelProps = useMemo(() => {
    return {
      ...dftModalProps,
      ...(payload?.props?.modal ?? {}),
      onOk,
      visible,
      onCancel,
      afterClose,
    };
  }, [payload, visible, onOk, onCancel, afterClose]);
/*  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onOk();
    },
    [onOk]
  );

  // 一旦校验非法,需要逐个消除error-message
  useEffect(() => {
    if (valid) return;
    validate();
  }, [data, valid]);*/

  return (
    <Modal {...modelProps}>
      <FormContent
        fields={fields}
        onOk={onOk}
        validator={validator}
        formData={data}
        setField={(field) => {
          setData((old) => ({ ...old, ...field }));
        }}
      />
      {/* <form className="query-form" onSubmit={onSubmit}>
      <fieldset className="query-form_fieldset">
        {
          fields.map(it => {
            const Item = getComponent(it.type);
            return <Item
              {...it}
              key={it.name}
              value={data[it.name]}
              onChange={onChange(it.name)}
              errorMessage={errorMap[it.name]}
            />;
          })
        }
        用于enter提交的按钮
        <input type="submit" tabIndex={-1} className="query-form_confirm-btn"/>
      </fieldset>
    </form>*/}
    </Modal>
  );
}
