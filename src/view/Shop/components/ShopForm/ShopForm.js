import React,{useState} from 'react'
import style from './ShopForm.module.scss'
import { Button, Checkbox, Form, Input, Space } from 'antd'

export default function ShopForm() {
  const [initialValues,setInitialValues]=useState({})

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={style.shopform}>
      <Form 
        labelCol={{ span: 4 }} 
        wrapperCol={{ span: 20 }}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="店铺名称"
            name="shopName"
            rules={[{ required: true, message: '请输入标题!' }]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            label="店铺联系人"
            name="shopBoss"
            rules={[{ required: true, message: '请输入标题!' }]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            label="联系人电话"
            name="shopBoss"
            rules={[{ required: true, message: '请输入标题!' }]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            label="地址"
            name="address"
            rules={[{ required: true, message: '请输入标题!' }]}
            >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="简介"
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
    </div>
  )
}