import React from 'react'
import style from './Login.module.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store'
import { login } from '../../api/public'
import { useNavigate } from 'react-router-dom'


function Login () {
  const navigate = useNavigate()
  const { user } = useStore()
  const { setSates  } = user

  const onFinish = async (values) => {
    const res = await login(values)
    const { token } = res
    setSates({token},true)
    navigate('/')
  }

  return (
    <div className={style.login}>
      <Form
        name="normal_login"
        className={style.form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit"> 登录 </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default observer(Login)
