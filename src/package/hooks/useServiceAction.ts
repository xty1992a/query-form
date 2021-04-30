import {useRef, useState} from 'react'

export interface ServiceActionResult<ResultData> {
  success: boolean;
  data: ResultData | null;
}

export interface ServiceAction<ResultData> {
  resolve: (result: ServiceActionResult<ResultData>) => void;
  initialData: ResultData;
}

export function useServiceAction<Data=any>(options: ServiceAction<Data>) {
  const callback = useRef(() => {})
  const [visible, setVisible] = useState(true)
  const [data, setData] = useState<Data>(options.initialData)

  const onOk = () => {
    setVisible(false)
    callback.current = () => {
      options.resolve({ success: true, data })
    }
  }

  const onCancel = () => {
    setVisible(false)
    callback.current = () => {
      options.resolve({ success: false, data: null })
    }
  }

  const afterClose = () => {
    callback.current.call(null)
  }

  return {
    onOk,
    onCancel,
    data,
    visible,
    setData,
    setVisible,
    afterClose,
  }
}
