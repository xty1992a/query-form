// @ts-ignore
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import { render } from "react-dom";
import "antd/dist/antd.css";
import queryForm from "../package/main";
import type {FieldTypes , Field } from "../types";
import "./index.less";

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

interface Form {
  name: string;
  age: number;
}

const fields: Field<Form>[] = [
  {
    name: 'name',
    label: '名称',
    value: '',
    type: 'Input'
  }
]

function App() {
  const [form, setForm] = useState<Form>({
    name: '',
    age: 10
  });

  const onClick = async () => {
    const result = await queryForm<Form>({
      formData: form,
      fields
    });
    console.log("result", result);
    if (!result.success) return;
    setForm(result.data)
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

render(<App />, document.getElementById("app"));
