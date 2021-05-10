import React, {useCallback, useEffect, useState} from "react";
import {Button} from "antd";
import {render} from "react-dom";
import "antd/dist/antd.css";
import queryForm from "../package/main";
import type {FieldTypes, Field} from "../types";
import "./index.less";

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

interface Form {
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
      return keys.map(i => ({label: i, value: i}));
    }
  },
];

function App() {
  const [form, setForm] = useState<Form>({
    name: '',
    age: 10,
    hobby: '唱'
  });

  const onClick = async () => {
    const result = await queryForm<Form>({
      formData: form,
      fields,
      props: {
        modal: {
          title: '查询表单'
        }
      }
    });
    console.log("result", result);
    if (!result.success) {
      console.log(result.data);
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
