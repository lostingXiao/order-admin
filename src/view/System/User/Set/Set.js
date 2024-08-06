import React,{ useState,useEffect } from 'react'
import style from './Set.module.scss'
import SetForm from '../../../../components/SetForm/SetForm'
import { Button, Select, Form, Input, Space } from 'antd'
import { seloptions } from '../../../../mock'
import { roleAll } from '../../../../api/system'

export default function Set() {
  const [initialValues,setInitialValues]=useState({})
  const [ roleOptions,setRoleOptions ]=useState([])

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const getRoleOptions=async ()=>{
    const res= await roleAll()
    setRoleOptions(res.data.list)
  }

  useEffect(()=>{
    getRoleOptions()
  },[])

  return (
    <div className={style.set}>
      <SetForm>
      <Form 
        labelCol={{ span: 4 }} 
        wrapperCol={{ span: 20 }}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            label="角色"
            name="roleId"
            rules={[{ required: true, message: '请选择角色' }]}
            >
            <Select fieldNames={{label:'name',value:'id'}} options={roleOptions} />
          </Form.Item>
          <Form.Item
            label="归属商铺"
            name="shopId"
            >
            <Select options={seloptions} />
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