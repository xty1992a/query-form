import React from "react";
import {FieldProps} from '../../../../types'
import './index.less'

interface FieldDisplayProps<Form> extends FieldProps<Form> {
  errorMessage?: string
}

export default function FieldDisplay<Form>(props: FieldDisplayProps<Form>) {
  return <div className="field-display" style={props.style.field}>
    <div className="field-display_label" style={props.style.label}>{props.label}</div>
    <div className="field-display_value" style={props.style.value}>
      {props.children}
    </div>
  </div>
}
