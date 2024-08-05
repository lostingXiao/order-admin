import React from 'react';
import { Button, Col, Form, Input, Row, Select, Space } from 'antd';
import style from './SearchForm.module.scss'

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
      elment=(
        <Form.Item name={item.key} label={item.label} rules={item.rules}>
          <Input allowClear placeholder={item.placeholder} />
        </Form.Item>
      )
    break
  }
  return (
    elment
  )
}

export default function SearchForm({data,api}) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Shop values of form: ', values);
  }

  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={16}>
        {data.map(item=>(
          <Col span={6} key={item.key}>
            <FormItem item={item}></FormItem>
          </Col>
        ))}
        <Col className={style.handle}>
          <Space>
            <Button type="primary" htmlType='submit'>查询</Button>
            <Button onClick={()=>form.resetFields()}>重置</Button>
          </Space>
        </Col>
      </Row>
    </Form>
  )
}
