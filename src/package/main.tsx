import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import QueryForm from "./QueryForm";
import {QueryFormProps, QueryPayload, ServiceActionResult} from '../types'
import {Form} from "antd";

const dftOptions = {
  value: [],
  options: [],
  radio: false,
  paging: false,
  title: "标题",
  width: "600px",
  searchable: false,
  alias: {
    key: "key",
  },
};

export default function pickItem<Data>(
  options: QueryPayload<Data>
): Promise<ServiceActionResult<Data>> {
  return new Promise((resolve) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const _resolve = (result: ServiceActionResult<Data>) => {
      unmountComponentAtNode(div);
      resolve(result);
    };

    const payload = {
      formData: options.formData,
      fields: options.fields,
      props: options.props
    }

    render(<QueryForm<Data> payload={payload} resolve={_resolve} />, div);
  });
}
