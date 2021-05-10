import React from "react";
import FieldDisplay from '../Display'
import {FieldProps} from "../../../../types";
import {Input} from 'antd'

interface InputProps<Form> extends FieldProps<Form> {
  value: string | number
}
export default function FieldInput<Form, Type="Input">(props: InputProps<Form>) {
  return <FieldDisplay {...props}>
    <Input value={props.value} onChange={e => {
      const value = e.target.value
      props.onChange(typeof props.value === 'number' ? Number(value): value)
    }
    }/>
  </FieldDisplay>
}
