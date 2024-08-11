import React,{ useState,useEffect } from 'react'
import style from './SetForm.module.scss'
import { useNavigate,useParams } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space } from 'antd'


export default function SetForm({ children,initialValues,onFinish,labelCol,wrapperCol,title,disabled }) {
  const navigate=useNavigate()
  const [form] = Form.useForm()

  const getFieldsValue= async ()=>{
    await form.validateFields() 
    const values=form.getFieldsValue(true)
    onFinish(values)
  }

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

  return (
    <div className={style.setform}>
      {
        title && 
        <div className={style.page}>
          <div className={style.item}>
            <span className={style.text}> {title}</span>
          </div>
          <LogoutOutlined onClick={()=>navigate(-1)}></LogoutOutlined>
        </div>
      }
      
      <div className={style.form}>
        <Form 
          form={form}
          disabled={disabled}
          labelCol={ labelCol || { span: 4 }} 
          wrapperCol={ wrapperCol || { span: 20 }}
          initialValues={ initialValues }
          onFinish={ onFinish }>
          {children}
          <Form.Item wrapperCol={{ offset: ( labelCol && labelCol.span ) || 4, span: ( wrapperCol && wrapperCol.span ) || 20 }} >
            <Space>
              <Button type="primary" onClick={getFieldsValue}> 提交 </Button>
              <Button onClick={()=>form.resetFields()}> 重置 </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}