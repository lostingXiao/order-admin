import React, { useState } from 'react'
import style from './Set.module.scss'
import SetForm from '../../../../components/SetForm/SetForm'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import ShopForm from '../../components/ShopForm/ShopForm'

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
        <ShopForm></ShopForm>
      </SetForm>
    </div>
  )
}