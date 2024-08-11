import React,{ useRef, useState } from 'react'
import style from './Role.module.scss'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../components/DataTable/DataTable'
import SearchForm from '../../../components/SearchForm/SearchForm'
import { roleList } from '../../../api/system'
import { Button, Space } from 'antd'

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
  const config=(type,id)=>{
    navigate(`/system/role/${type}`,{state:{id}})
  }
  const buttons=[
    {label:'新增',onClick:add},
    // {label:'编辑',onClick:edit},
    // {label:'详情',onClick:detail},
  ]

  const columns = [
    { title: '序号', key: 'index', render: (text, record, index) => `${index + 1}` },
    { title: '名称', dataIndex: 'name', key: 'name',},
    { title: '操作', key: 'index', render: (text, record, index) => {
      return (
        <Space>
          <Button type='link' onClick={()=>config('edit',record.id)}>编辑</Button>
          <Button type='link' onClick={()=>config('detail',record.id)}>详情</Button>
        </Space>
      )
    } },
  ]

  

  const onFinish = (values) => {
    tableRef.current.onReset();
  }
  const onValuesChange = (changedValues,allValues) => {
    setTableParams(allValues)
  }

  return (
    <div className={style.menu}>
      <SearchForm data={searchData} onFinish={onFinish} onValuesChange={onValuesChange}/>
      <DataTable ref={tableRef} columns={columns} buttons={buttons} params={tableParams} api={roleList} rowKey='id' />
    </div>
  )
}