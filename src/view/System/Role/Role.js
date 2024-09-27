import React,{ useRef, useState } from 'react'
import style from './Role.module.scss'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../components/DataTable/DataTable'
import SearchTable from '../../../components/SearchTable/SearchTable'
import { roleList } from '../../../api/system'
import { Button, Space } from 'antd'

const searchData=[
  { key:'name',type:'input',placeholder:'权限名称',label:'权限名称' },
  { key:'keyword',type:'input',placeholder:'权限关键字',label:'权限关键字' },
]

export default function Role() {
  const navigate = useNavigate()
  
  const config=(type,id)=>{
    console.log(type)
    navigate(`/system/systemRole/${type}`,{state:{id}})
  }

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
      } 
    }
  ]

  return (
    <div className={style.menu}>
      <SearchTable rowKey='id' searchData={searchData} columns={columns} buttons={[{label:'新增',onClick:()=>config('add')}]} api={roleList} />
    </div>
  )
}