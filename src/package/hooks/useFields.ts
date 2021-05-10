import React, {useMemo, useRef} from 'react';
import {Field, StaticField} from '../../types';
import {dftFieldStyle} from '../consts'

export function useFields<Form>(options: {}, [fields, form, ...deps]: any[]) {

  const computedFields = useMemo<StaticField<Form>[]>(() => {
    return fields.map((it: Field<Form>) => {
      const field = {...it};
      field.visible = (typeof field.visible === "function") ? field.visible(form) : (typeof field.visible === 'boolean') ? field.visible : true;
      field.options = (typeof field.options === 'function') ? field.options(form) : field.options
      field.style = {
        field: {...field?.style?.field??dftFieldStyle.field},
        label: {...field?.style?.label??dftFieldStyle.label},
        value: {...field?.style?.value??dftFieldStyle.value},
      }
      return field;
    }).filter((it: StaticField<Form>) => it.visible)
  }, [fields, form]);

  return [computedFields]
}
