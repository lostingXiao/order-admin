import React,{ useState,useEffect } from 'react'
import style from './Set.module.scss'
import SetForm from '../../../../components/SetForm/SetForm'
import { Button, Cascader, Form, Input, Space,Select } from 'antd'
import { options } from '../../../../mock'
import { addRole,menuList,authAll } from '../../../../api/system'

export default function Set() {
  const [initialValues,setInitialValues]=useState({})
  const [ menuOptions,setMenuOptions ]=useState([])
  const [ authOptions,setAuthOptions ]=useState([])

  const onFinish = async v => {
    console.log('Success:', v);
    const { name,menus:mes,permissions:pers } = v 
    const menus=mes?mes.map(item=>item[item.length-1]):[]
    const permissions=pers||[]
    const params ={ name,menus,permissions }
    console.log(params)
    const res = await addRole(params)
  };
  const getMenuOptions = async () => {
    const res = await menuList()
    setMenuOptions(res.data.list)
  }

  const getAuthOptions= async () => {
    const res = await authAll()
    setAuthOptions(res.data.list)
  }

  useEffect(() => {
    getMenuOptions()
    getAuthOptions()
  }, [])

  return (
    <div className={style.set}>
      <SetForm>
      <Form 
        labelCol={{ span: 4 }} 
        wrapperCol={{ span: 20 }}
        initialValues={initialValues}
        onFinish={onFinish}
        >
          <Form.Item
            label="角色名称"
            name="name"
            rules={[{ required: true, message: '请输入标题!' }]}
            >
            <Input />
          </Form.Item>
          <Form.Item label="权限" name="permissions">
            <Select options={authOptions} fieldNames={{label:'name',value:'id'}} mode="multiple">
            </Select>
          </Form.Item>
          <Form.Item label="菜单" name="menus" >
            <Cascader
              style={{ width: '100%'}}
              options={menuOptions}
              fieldNames={{label:'name',value:'id'}}
              showCheckedStrategy={Cascader.SHOW_CHILD}
              multiple
              // defaultValue={[
              //   ['bamboo', 'little', 'fish'],
              //   ['bamboo', 'little', 'cards'],
              //   ['bamboo', 'little', 'bird'],
              // ]}
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