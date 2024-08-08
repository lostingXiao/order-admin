import React,{ useState,useEffect } from 'react'
import style from './Set.module.scss'
import { useNavigate } from 'react-router-dom'
import SetForm from '../../../../components/SetForm/SetForm'
import { Button, Select, Form, Input, Space } from 'antd'
import { seloptions } from '../../../../mock'
import { roleAll,addUser } from '../../../../api/system'
import { shopAll } from '../../../../api/business'


export default function Set() {
  const navigate=useNavigate()
  const [form] = Form.useForm()
  const [initialValues,setInitialValues]=useState({})
  const [ roleOptions,setRoleOptions ]=useState([])
  const [ shopOptions,setShopOptions ]=useState([])

  const onFinish = async (values) => {
    console.log('Success:', values)
    const res = await addUser(values)
    navigate(-1)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  const getRoleOptions=async ()=>{
    const res= await roleAll()
    setRoleOptions(res.data.list)
  }

  const getShopOptions=async ()=>{
    const res= await shopAll()
    setShopOptions(res.data.list)
  }

  useEffect(()=>{
    getRoleOptions()
    getShopOptions()
  },[])

  return (
    <div className={style.set}>
      <SetForm>
      <Form 
        form={form}
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
            <Select fieldNames={{label:'name',value:'id'}} options={shopOptions} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }} >
            <Space>
              <Button type="primary" htmlType="submit"> 提交 </Button>
              <Button onClick={()=>form.resetFields()}> 重置 </Button>
            </Space>
          </Form.Item>
        </Form>
      </SetForm>
    </div>
  )
}