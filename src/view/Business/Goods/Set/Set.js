import React, { useState } from 'react'
import style from './Set.module.scss'
import SetForm from '../../../../components/SetForm/SetForm'
import { SettingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space,Upload,InputNumber,Switch } from 'antd'
import ShopForm from '../../components/ShopForm/ShopForm'

export default function Set() {
  const fileList = []
  const [initialValues,setInitialValues]=useState({})

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={style.set}>
      <SetForm>
      <Form 
        labelCol={{ span: 6 }} 
        wrapperCol={{ span: 18 }}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="商品名称"
            name="shopName"
            rules={[{ required: true, message: '请输入标题!' }]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            label="商品图片"
            name="img"
            rules={[{ required: true, message: '请输入标题!' }]}
            >
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture"
              defaultFileList={[...fileList]}
            >
            <Button >Upload</Button>
          </Upload>
          </Form.Item>
          <Form.Item
            label="最小销售数量"
            name="min"
            rules={[{ required: true, message: '请输入标题!' }]}
            >
            <InputNumber min={1} defaultValue={3}  />
          </Form.Item>
          <Form.Item
            label="单价"
            name="price"
            rules={[{ required: true, message: '请输入标题!' }]}
            >
            <InputNumber min={1} defaultValue={3} addonAfter='元' />
          </Form.Item>
          <Form.Item
            label="是否上架"
            name="price"
            rules={[{ required: true, message: '请输入标题!' }]}
            >
            <Switch />
          </Form.Item>
          <Form.Item
            label="商品描述"
            name="address"
            rules={[{ required: true, message: '请输入标题!' }]}
            >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }} >
            <Space>
              <Button type="primary" htmlType="submit"> 提交 </Button>
              <Button htmlType="submit"> 重置 </Button>
            </Space>
          </Form.Item>
        </Form>
      </SetForm>
    </div>
  )
}