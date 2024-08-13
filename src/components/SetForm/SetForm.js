import React,{ useState,useEffect } from 'react'
import style from './SetForm.module.scss'
import { useNavigate,useParams } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space } from 'antd'


export default function SetForm({ children,initialValues,onFinish,onRest,labelCol,wrapperCol,title,disabled }) {
  const navigate=useNavigate()
  const [form] = Form.useForm()

  const onFormFinish = v =>{
    const values = { ...initialValues,...v }
    onFinish(values)
  }
  const onFormRest = v =>{
    form.resetFields()
    onRest && onRest()
  }

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [ initialValues ])

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
          onFinish={ onFormFinish }>
          {children}
          <Form.Item wrapperCol={{ offset: ( labelCol && labelCol.span ) || 4, span: ( wrapperCol && wrapperCol.span ) || 20 }} >
            <Space>
              <Button type="primary" htmlType="submit"> 提交 </Button>
              <Button onClick={onFormRest}> 重置 </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}