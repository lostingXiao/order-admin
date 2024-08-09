import React from 'react'
import style from './Login.module.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import { observer } from 'mobx-react-lite'
import {  useStore } from '../../store'
import { login } from '../../api/public'


const Login = observer(() => {

  const { user }=useStore().store
  console.log(user.name)
  const { token,setSates } = user
  // console.log(user)
  


  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    // console.log(name,setSates);
    const res = await login(values)
    
    // setSates('token',res.data.token)
    console.log(res);

  }

  // const submitLogin = () => {
  //   loginFormRef.value
  //     .validate()
  //     .then(() => {
  //       loginLoading.value = true
  //       store
  //         .dispatch('user/login', loginForm.value)
  //         .then(async (res) => {
  //           loginLoading.value = false
  //           router.push('/')
  //         })
  //         .catch((err) => {
  //           loginLoading.value = false
  //           console.log('loginUser', err)
  //         })
  //     })
  //     .catch((err) => console.log('err', err))
  // }

  return (
    <div className={style.login}>
      {/* {{ token }} */}
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
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  )
})

export default Login
