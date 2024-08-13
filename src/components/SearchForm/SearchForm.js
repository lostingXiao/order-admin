import React from 'react';
import style from './SearchForm.module.scss'
import { Button, Col, Form, Input, Select, Space } from 'antd';

function FormItem({item}){
  const {type} = item
  let elment=''
  switch(type){
    case 'input':
      elment=( 
        <Form.Item name={item.key} label={item.label} rules={item.rules}>
          <Input allowClear placeholder={item.placeholder} />
        </Form.Item>
      )
      break
    case 'select':
      elment =(
        <Form.Item name={item.key} label={item.label} rules={item.rules}>
          <Select allowClear placeholder={item.placeholder}>
            {item.options.map(option=>(
              <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
      break
    default:
      elment=''
    break
  }
  return (
    elment
  )
}

export default function SearchForm({data,onFinish}) {
  const [form] = Form.useForm()
  return (
    <Form form={form} layout="inline" onFinish={onFinish} className={ style.searchform }>
        {data.map(item=>{
          if(item.hide){
            return ''
          }else{
            return (
              <Col span={6} key={item.key}>
                <FormItem item={item}></FormItem>
              </Col>
            )
          }
        })}
        <Col span={6}>
          <Space>
            <Button type="primary" htmlType='submit'>查询</Button>
            <Button onClick={()=>form.resetFields()}>重置</Button>
          </Space>
        </Col>
    </Form>
  )
}
