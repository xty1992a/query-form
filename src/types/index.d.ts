import React from 'react'

/*export enum FieldTypes {
  'Input',
  'Picker',
  'Checkbox',
  'Date',
  'LinkPicker',
}*/

type FieldTypes = 'Input'|'Picker'|'Checkbox'|'Date'|'LinkPicker'

export interface Item<Form>{
  value: string|number;
  label: string;
  disabled?: boolean | ((form: Form) => boolean);
  [prop: string]: any;
}

export interface Field<Form> {
  type: FieldTypes;
  label: string;
  name: keyof Form;
  value: string | number | (number | string)[];
  visible?: boolean | ((form: Form) => boolean);
  options?: Item<Form>[];
}

export interface QueryPayload<Form> {
  fields: Field<Form>[];
  formData: Form;
  validator?: (form: Form) => Promise<boolean>
  props?: {
    modal?: any;
    form?: any;
  }
}

export interface QueryFormProps<Form> extends React.Props<any> {
  payload:QueryPayload<Form>,
  resolve: Function;
}


export interface ServiceActionResult<ResultData> {
  success: boolean;
  data: ResultData | null;
}

export interface ServiceAction<ResultData> {
  resolve: Function;
  initialData: ResultData;
}
