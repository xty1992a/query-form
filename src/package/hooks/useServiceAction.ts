import React,{useRef, useState} from 'react'
import {ServiceActionResult, ServiceAction} from '../../types'

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
