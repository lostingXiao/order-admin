import React from 'react'
import style from './ShopForm.module.scss'
import { Form, Input } from 'antd'
import UploadImg from '../../../../components/UploadImg/UploadImg'

export default  function ShopForm({ initFileList }) {
  return (
    <div className={style.shopform}>
      <Form.Item
        label="店铺名称"
        name="name"
        rules={[{ required: true, message: '请输入店铺名称' }]}
        >
        <Input />
      </Form.Item>
      <Form.Item label="店铺LOGO" name="logoUrl" valuePropName="logoUrl" rules={[{ required: true, message: '请上传店铺LOGO' }]} >
        <UploadImg maxCount={1} initFileList={initFileList} />
      </Form.Item>
      <Form.Item
        label="店铺联系人"
        name="contactPerson"
        rules={[{ required: true, message: '请输入店铺联系人' }]}
        >
        <Input />
      </Form.Item>
      <Form.Item
        label="联系人电话"
        name="contactPhone"
        rules={[{ required: true, message: '请输入联系人电话' }]}
        >
        <Input />
      </Form.Item>
      <Form.Item
        label="地址"
        name="address"
        rules={[{ required: true, message: '请输入地址' }]}
        >
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="简介" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>
    </div>
  )
}