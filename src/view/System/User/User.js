import React,{ useRef,useState } from 'react'
import style from './User.module.scss'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../components/DataTable/DataTable'
import SearchForm from '../../../components/SearchForm/SearchForm'
import { userList } from '../../../api/system'

const columns = [
  { title: '姓名',dataIndex: 'name',key: 'name',},
  { title: '年龄', dataIndex: 'age', key: 'age',},
  { title: '住址', dataIndex: 'address', key: 'address',},
];

const searchData=[
  { key:'username',type:'input',placeholder:'用户名',label:'用户名' },
  { key:'phone',type:'input',placeholder:'手机号',label:'手机号' },
]

export default function User() {
  const navigate = useNavigate()
  const tableRef = useRef(null);
  const [formData,setFormData] =useState({})
  const add=()=>{
    navigate('/system/user/set/add')
  }
  const edit=()=>{
    navigate('/shop/set/edit',{state:{id:'1'}})
  }
  const detail=()=>{
    navigate('/shop/set/detail',{state:{id:'1'}})
  }
  const buttons=[
    {label:'新增',onClick:add},
    {label:'修改',onClick:edit},
    {label:'导出',onClick:detail},
  ]
  const onFinish = (values) => {
    console.log('Shop values of form: ', values);
  }

  const onValuesChange = (changedValues,allValues) => {
    console.log('onValuesChange form: ');
    console.log(changedValues)
    console.log(allValues)
    setFormData(allValues)
  }

  return (
    <div className={style.menu}>
      <SearchForm data={searchData} onFinish={onFinish} onValuesChange={onValuesChange}/>
      <DataTable ref={tableRef} columns={columns} buttons={buttons} params={formData} api={userList} />
    </div>
  )
}
