import React,{ useState,useEffect } from 'react'
import style from './Set.module.scss'
import { useNavigate,useParams,useLocation } from 'react-router-dom'
import SetForm from '../../../../components/SetForm/SetForm'
import { Button, Select, Form, Input, Space } from 'antd'
import { seloptions } from '../../../../mock'
import { roleAll,addUser,userDetail,editUser } from '../../../../api/system'
import { shopAll } from '../../../../api/business'


export default function Set() {
  const navigate=useNavigate()
  const [form] = Form.useForm()
  const [initialValues,setInitialValues]=useState({})
  const [ roleOptions,setRoleOptions ]=useState([])
  const [ shopOptions,setShopOptions ]=useState([])
  const { type } = useParams()
  const { state } = useLocation()

  const onFinish = async (values) => {
    console.log('Success:', values)
    const res = type==='add' ? await addUser(values):await editUser(values)
    navigate(-1)
  }

  const getRoleOptions=async ()=>{
    const res= await roleAll()
    setRoleOptions(res.list)
  }

  const getShopOptions=async ()=>{
    const res= await shopAll()
    setShopOptions(res.list)
  }

  const getUserDetail= async () => {
    const res = await userDetail({ id:state.id })
    const { id,username,password,phone,role_id:roleId,shop_id:shopId } = res
    setInitialValues({ id,username,password,phone,roleId,shopId })
  }

  const init=()=>{
    getRoleOptions()
    getShopOptions()
    if(type!=='add'){
      getUserDetail()
    }
  }

  useEffect(()=>{
    init()
  },[])

  return (
    <div className={style.set}>
      <SetForm 
        title={type==='add'?'新建':type==='edit'?'编辑':'详情'} 
        initialValues={initialValues} 
        onFinish={onFinish}
        disabled={type==='detail'} >
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
      </SetForm>
    </div>
  )
}