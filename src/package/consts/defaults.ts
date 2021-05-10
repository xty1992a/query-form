import {FieldStyle} from '../../types'
import {ModalProps} from 'antd/lib/modal'

export const dftFieldStyle: FieldStyle = {
  field: {
    width: '50%'
  },
  label: {
    width: '90px'
  },
  value: {}
}

export const dftModalProps: ModalProps = {
  title: '查询',
  width: '600px',
  cancelText: '取消',
  okText: '确定'
}
