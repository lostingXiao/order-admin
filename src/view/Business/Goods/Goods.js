import React,{ useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom'

import style from './Goods.module.scss'
import SearchForm from '../../../components/SearchForm/SearchForm'
import DataTable from '../../../components/DataTable/DataTable'
import { shopList } from '../../../api/business'
import { Button, Space } from 'antd'
import { options } from '../../../mock'

const searchData=[
  { key:'name1',type:'input',placeholder:'商品名称',label:'商品名称' },
  { key:'name2',type:'select',placeholder:'销售状态',label:'销售状态',options:[
      { value: '1', label: '上架'},
      { value: '2', label: '下架'},
    ] 
  }
]

export default function Goods() {
  const navigate = useNavigate()
  const tableRef = useRef(null)
  const [searchFormData,setSearchFormData] =useState({})

  const config=(type,id)=>{
    navigate(`/business/goods/${type}`,{state:{id}})
  }

  const columns = [
    { title: '商品名称',dataIndex: 'name',key: 'name',},
    { title: '图片', dataIndex: 'contact_person', key: 'contact_person',},
    { title: '单价', dataIndex: 'contact_phone', key: 'contact_phone',},
    { title: '描述', dataIndex: 'address', key: 'address',},
    { title: '销售状态', dataIndex: 'address', key: 'address',},
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
    setSearchFormData(allValues)
  }

  return (
    <div className={style.goods}>
      <SearchForm data={searchData} onFinish={onFinish} onValuesChange={onValuesChange}/>
      <DataTable ref={tableRef} columns={columns} buttons={[{label:'新增',onClick:()=>config('add')}]} params={searchFormData} api={shopList} rowKey='id' />
    </div>
  )
}