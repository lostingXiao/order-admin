import React,{ useState,useEffect } from 'react'
import style from './Set.module.scss'
import SetForm from '../../../../components/SetForm/SetForm'
import { Button, Cascader, Form, Input, Space,Select } from 'antd'
import { addRole,menuList,authAll,roleDetail,editRole } from '../../../../api/system'
import { useParams,useLocation,useNavigate } from 'react-router-dom'

export default function Set() {
  const navigate = useNavigate()
  const [ initialValues,setInitialValues ]=useState({})
  const [ menuOptions,setMenuOptions ]=useState([])
  const [ authOptions,setAuthOptions ]=useState([])
  const { type } = useParams()
  const { state } = useLocation()

  const onFinish = async v => {
    console.log('Success:', v);
    const { id,name,menus:mes,permissions:pers } = v 
    const menus=mes||[]
    const permissions=pers||[]
    const params ={ name,menus,permissions }
    const res = type==='add'?await addRole(params):await editRole({ id,name,menus,permissions })
    navigate(-1)
  }
  const getMenuOptions = async () => {
    const res = await menuList()
    setMenuOptions(res.list)
  }

  const getAuthOptions= async () => {
    const res = await authAll()
    setAuthOptions(res.list)
  }

  const getRoleDetail= async () => {
    const res = await roleDetail({ id:state.id })
    setInitialValues(res)
  }

  const init=()=>{
    getMenuOptions()
    getAuthOptions()
    if(type!=='add'){
      getRoleDetail()
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className={style.set}>
      <SetForm 
        onFinish={onFinish} 
        initialValues={initialValues}
        title={type==='add'?'新建':type==='edit'?'编辑':'详情'} 
        disabled={type==='detail'}>
        <Form.Item
          label="角色名称"
          name="name"
          rules={[{ required: true, message: '请输入标题!' }]}
          >
          <Input />
        </Form.Item>
        <Form.Item label="权限" name="permissions">
          <Select allowClear options={authOptions} fieldNames={{label:'name',value:'code'}} mode="multiple">
          </Select>
        </Form.Item>
        <Form.Item label="菜单" name="menus" >
          <Cascader
            allowClear
            style={{ width: '100%'}}
            options={menuOptions}
            fieldNames={{label:'name',value:'id'}}
            showCheckedStrategy={Cascader.SHOW_CHILD}
            multiple
          />
        </Form.Item>
      </SetForm>
    </div>
  )
}