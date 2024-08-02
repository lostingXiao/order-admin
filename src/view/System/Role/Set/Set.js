import React,{ useState } from 'react'
import style from './Set.module.scss'
import SetForm from '../../../../components/SetForm/SetForm'
import { Button, Cascader, Form, Input, Space } from 'antd'
import { options } from '../../../../mock'

export default function Set() {
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
        labelCol={{ span: 4 }} 
        wrapperCol={{ span: 20 }}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="角色名称"
            name="name"
            rules={[{ required: true, message: '请输入标题!' }]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            label="关键字"
            name="key"
            rules={[{ required: true, message: '请输入标题!' }]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            label="菜单权限"
            name="menus"
            rules={[{ required: true, message: '请输入标题!' }]}
            >
            <Cascader
              style={{ width: '100%'}}
              options={options}
              multiple
              defaultValue={[
                ['bamboo', 'little', 'fish'],
                ['bamboo', 'little', 'cards'],
                ['bamboo', 'little', 'bird'],
              ]}
            />
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