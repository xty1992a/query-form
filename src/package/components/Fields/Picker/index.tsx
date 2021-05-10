import React, {useEffect} from "react";
import FieldDisplay from '../Display';
import {FieldProps} from "../../../../types";
import {Select} from 'antd';

interface PickerProps<Form> extends FieldProps<Form, "Picker"> {
  value: string | number,
}

export default function FieldInput<Form>(props: PickerProps<Form>) {

  const subProps: FieldProps<Form> = {
    ...props,
    options: undefined
  };

  useEffect(() => {
    // 如果值不在options中,重置值
    const values = props.options.map(it => it.value);
    if (!props.value) return;
    if (values.includes(props.value)) return;
    props.onChange(typeof props.value === "number" ? 0 : '');
  }, [props.options, props.value]);

  return <FieldDisplay {...subProps}>
    <Select value={props.value} onChange={(v: typeof props.value) => props.onChange(v)}>
      {
        props.options.map((item) => <Select.Option
          key={item.value}
          value={item.value}
          disabled={!!(item.disabled)}
        >
          {item.label}
        </Select.Option>)
      }
    </Select>
  </FieldDisplay>;
}
