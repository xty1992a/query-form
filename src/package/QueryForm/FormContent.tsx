import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef, PropsWithChildren,
} from "react";
import { FormContentProps, StaticField , FormData} from "../../types";
import getComponent from "../components/Fields";
import * as hooks from "../hooks";

const FormContent = <Form extends FormData>(props: FormContentProps<Form>, ref) => {
  /*const { formData, fields, setField, validator, onOk } = props;
  const { valid, validate, errorMap } = hooks.useValidate<Form>({ validator }, [
    formData,
  ]);

  const onChange = (key: keyof Form) => (value: any) => {
    // console.log(key, value)
    // @ts-ignore
    setField({ [key]: value });
  };
  const onSubmit = useCallback(
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
  }, [formData, valid]);
  useImperativeHandle(ref, () => ({ validate }));
  return (
    <div>
      <form className="query-form" onSubmit={onSubmit}>
        <fieldset className="query-form_fieldset">
          {fields.map((it) => {
            const Item = getComponent<Form>(it.type);
            return (
            // @ts-ignore
              <Item {...it} key={it.name} value={formData[it.name]} onChange={onChange(it.name)} errorMessage={errorMap[it.name]}
              />
            );
          })}
          {/!*用于enter提交的按钮*!/}
          <input
            type="submit"
            tabIndex={-1}
            className="query-form_confirm-btn"
          />
        </fieldset>
      </form>
    </div>
  );*/
  return <></>
}

export default forwardRef(FormContent);
