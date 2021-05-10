import React, {useCallback, useEffect, useState} from "react";
import {Button, Input} from "antd";
import {render} from "react-dom";
import "antd/dist/antd.css";
import queryForm from "../package/main";
import type {Validator, Field, FormData} from "../types";
import "./index.less";

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

interface Form extends FormData {
  name: string;
  age: number;
  hobby: string
}

const fields: Field<Form>[] = [
  {
    name: 'name',
    label: '名称',
    type: 'Input'
  },
  {
    name: 'age',
    label: '年龄',
    type: "Input"
  },
  {
    name: 'hobby',
    label: '爱好',
    type: "Picker",
    visible: form => form.age > 10,
    options: form => {
      let keys: string[] = [];
      if (form.age < 20) {
        keys = ['吃', '睡', '阿巴阿巴'];
      }
      else {
        keys = ['唱', '跳', '打篮球'];
      }
      // 如果是蔡徐坤,只配阿巴阿巴,不配唱跳打篮球
      const disabled = (i: string) => ['唱', '跳', '打篮球'].includes(i) ? ((form: Form) => form.name === '蔡徐坤') : undefined
      return keys.map(i => ({label: i, value: i, disabled: disabled(i)}));
    }
  },
];

const validator: Validator<Form> = async (form) => {
  const name = !form.name ? '请填写名称' : '';
  const hobby = (form.age > 10 && !form.hobby) ? '请选择爱好' : '';
  return {
    name,
    hobby,
  };
};

function App() {
  const [form, setForm] = useState<Form>({
    name: '蔡徐坤',
    age: 28,
    hobby: ''
  });

  const onClick = async () => {
    const result = await queryForm<Form>({
      formData: form,
      fields,
      validator,
      props: {
        modal: {
          title: '查询表单',
          width: '500px'
        }
      }
    });
    console.log("result", result);
    if (!result.success) {
      return;
    }
    setForm(result.data);
  };

  useEffect(() => {
    onClick();
  }, []);

  return (
    <>
      <Button type="primary" onClick={onClick}>
        选择
      </Button>
      <pre>
        {
          JSON.stringify(form, null, 4)
        }
      </pre>
    </>
  );
}

render(<App/>, document.getElementById("app"));
