import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import QueryForm from "./QueryForm";
import {QueryFormProps, QueryPayload, ServiceActionResult} from '../types'

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

export default function pickItem<Item>(
  options: QueryPayload<Item>
): Promise<ServiceActionResult<Item>> {
  return new Promise((resolve) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const _resolve = (result: ServiceActionResult<Item>) => {
      unmountComponentAtNode(div);
      resolve(result);
    };

    const payload = {
      formData: {
        name: ''
      },
      fields: []
    }

    render(<QueryForm payload={payload} resolve={_resolve} />, div);
  });
}
