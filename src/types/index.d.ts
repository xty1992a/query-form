import React from "react";
import { ModalProps } from "antd/lib/modal";

/*export enum FieldTypes {
  'Input',
  'Picker',
  'Checkbox',
  'Date',
  'LinkPicker',
}*/

export interface FormData {
  [key: string]: string | number | (string | number)[];
}

type FieldTypesWithOptions = "Picker" | "Checkbox";
type FieldTypes = "Input" | "Date" | "LinkPicker" | FieldTypesWithOptions;

/*备选项的item*/
export interface Item<Form> {
  value: string | number;
  label: string;
  disabled?: boolean | ((form: Form) => boolean);

  [prop: string]: any;
}

export interface StaticItem {
  value: string | number;
  label: string;
  disabled: boolean;
}

export interface FieldStyle {
  field?: React.CSSProperties;
  label?: React.CSSProperties;
  value?: React.CSSProperties;
}

/*对外表单项配置,部分字段可为函数*/
export interface Field<Form, Type = "Input"> {
  type: FieldTypes;
  label: string;
  name: keyof Form;
  visible?: boolean | ((form: Form) => boolean);
  options?: Item<Form>[] | ((form: Form) => Item<Form>[]);
  style?: FieldStyle;
}

/*静态的表单项,内部使用,必须是确切的静态对象*/
export interface StaticField<Form, Type = "Input"> {
  type: FieldTypes;
  label: string;
  name: keyof Form;
  visible: boolean;
  options: Type extends FieldTypesWithOptions ? StaticItem[] : undefined;
  style: FieldStyle;
}

/*通用表单项组件props*/
export interface FieldProps<Form, Type = "Input">
  extends React.Props<any>,
    StaticField<Form, Type> {
  value: string | number;
  onChange: Function;
  errorMessage: string;
}

export type ValidatorResult<Form = {}> = {
  [Key in keyof Form]?: string;
};

export type Validator<Form> = (form: Form) => Promise<ValidatorResult<Form>>;

/*函数配置定义*/
export interface QueryPayload<Form> {
  fields: Field<Form>[];
  formData: Form;
  validator?: Validator<Form>;
  props?: {
    modal?: ModalProps;
    form?: any;
  };
}

/*弹窗主体组件props*/
export interface QueryFormProps<Form> extends React.Props<any> {
  payload: QueryPayload<Form>;
  resolve: Function;
}

/*弹窗表单组件props*/
export interface FormContentProps<Form> extends React.Props<any> {
  formData: Form;
  fields: StaticField<Form>[];
  setField: (field: Partial<Form>) => void;
  onOk: Function;
  validator?: Validator<Form>;
}

/*命令式弹窗返回结果定义*/
export interface ServiceActionResult<ResultData> {
  success: boolean;
  data: ResultData;
}

/*命令式弹窗hooks定义*/
export interface ServiceAction<ResultData> {
  resolve: Function;
  initialData: ResultData;
}
