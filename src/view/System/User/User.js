import React,{ useRef,useState } from 'react'
import style from './User.module.scss'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../components/DataTable/DataTable'
import SearchForm from '../../../components/SearchForm/SearchForm'
import { userList } from '../../../api/system'
import { Button, Space } from 'antd'

const searchData=[
  { key:'username',type:'input',placeholder:'用户名',label:'用户名' },
  { key:'phone',type:'input',placeholder:'手机号',label:'手机号' },
]

export default function User() {
  const navigate = useNavigate()
  const tableRef = useRef(null);
  const [formData,setFormData] =useState({})
 
  const config=(type,id)=>{
    navigate(`/system/user/set/${type}`,{state:{id}})
  }
  const columns = [
    { title: '姓名',dataIndex: 'username',key: 'name',},
    { title: '电话',dataIndex: 'phone',key: 'phone',},
    { title: '角色', dataIndex: 'role_name', key: 'role_name',},
    { title: '归属店铺', dataIndex: 'shop_name', key: 'shop_name',},
    { title: '创建时间', dataIndex: 'created_at', key: 'created_at',},
    { title: '操作', key: 'index', render: (text, record, index) => {
        return (
          <Space>
            <Button type='link' onClick={()=>config('edit',record.id)}>编辑</Button>
            <Button type='link' onClick={()=>config('detail',record.id)}>详情</Button>
          </Space>
        )
      } 
    }
  ]

  const onFinish = (values) => {
    console.log('Shop values of form: ', values);
    tableRef.current.onReset();
  }

  const onValuesChange = (changedValues,allValues) => {
    setFormData(allValues)
  }

  return (
    <div className={style.menu}>
      <SearchForm data={searchData} onFinish={onFinish} onValuesChange={onValuesChange}/>
      <DataTable ref={tableRef} columns={columns} buttons={[{label:'新增',onClick:()=>config('add')}]} params={formData} api={userList} rowKey='id' />
    </div>
  )
}
