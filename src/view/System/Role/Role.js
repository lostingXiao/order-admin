import React,{ useRef, useState } from 'react'
import style from './Role.module.scss'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../components/DataTable/DataTable'
import SearchForm from '../../../components/SearchForm/SearchForm'
import { roleList } from '../../../api/system'

const columns = [
  { title: 'ID',dataIndex: 'id',key: 'id',},
  { title: '名称', dataIndex: 'name', key: 'name',},
];

const searchData=[
  { key:'name',type:'input',placeholder:'权限名称',label:'权限名称' },
  { key:'keyword',type:'input',placeholder:'权限关键字',label:'权限关键字' },
]

export default function Role() {
  const navigate = useNavigate()
  const tableRef = useRef(null);
  const [tableParams,setTableParams] = useState({})

  const add=()=>{
    navigate('/system/role/add')
  }
  const edit=()=>{
    navigate('/system/role/edit',{state:{id:'1'}})
  }
  const detail=()=>{
    navigate('/system/role/detail',{state:{id:'1'}})
  }
  const buttons=[
    {label:'新增',onClick:add},
    {label:'修改',onClick:edit},
    {label:'导出',onClick:detail},
  ]
  const onFinish = (values) => {
    console.log('Shop values of form: ', values);
    tableRef.current.onReset();
  }
  const onValuesChange = (changedValues,allValues) => {
    console.log('onValuesChange form: ');
    console.log(changedValues)
    console.log(allValues)
    setTableParams(allValues)
  }


  return (
    <div className={style.menu}>
      <SearchForm data={searchData} onFinish={onFinish} onValuesChange={onValuesChange}/>
      <DataTable ref={tableRef} columns={columns} buttons={buttons} params={tableParams} api={roleList} rowKey='id' />
    </div>
  )
}