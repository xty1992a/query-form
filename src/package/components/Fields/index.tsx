import React from 'react';
import {FieldTypes, FieldProps} from '../../../types';

import Input from './Input';
import Picker from './Picker';
import FieldDisplay from './Display';

function FallBack<Form>(props: FieldProps<Form>) {
  return <FieldDisplay {...props}>
    <span>{props.value}</span>
  </FieldDisplay>;
}

export default function getComponent<Form>(type: FieldTypes): React.FC<FieldProps<Form, FieldTypes>> {
  switch (type) {
    case "Input":
      return Input as React.FC<FieldProps<Form>>;
    case "Picker":
      return Picker as React.FC<FieldProps<Form, "Picker">>;
  }
  return FallBack as React.FC<FieldProps<Form>>;
}
