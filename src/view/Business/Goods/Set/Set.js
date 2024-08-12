import React, { useState } from 'react'
import style from './Set.module.scss'
import SetForm from '../../../../components/SetForm/SetForm'
import { SettingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space,Upload,InputNumber,Switch } from 'antd'
import ShopForm from '../../components/ShopForm/ShopForm'
import { useParams,useLocation } from 'react-router-dom';
import UploadImg from '../../../../components/UploadImg/UploadImg';

export default function Set() {
  const fileList = []
  const [initialValues,setInitialValues]=useState({})
  const { type } = useParams()
  const { state } = useLocation()

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  const onRest= ()=>{

  }

  return (
    <div className={style.set}>
      <SetForm 
        title={type==='add'?'新建':type==='edit'?'编辑':'详情'} 
        initialValues={initialValues} 
        onFinish={onFinish}
        onRest={onRest}
        labelCol={ { span: 6 }} 
        disabled={type==='detail'} >
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
          <UploadImg />
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
      </SetForm>
    </div>
  )
}