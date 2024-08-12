import React,{ useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './Shop.module.scss'
import DataTable from '../../../components/DataTable/DataTable'
import SearchForm from '../../../components/SearchForm/SearchForm'
import { shopList,addShop } from '../../../api/business'
import { Space,Button } from 'antd'

const searchData=[
  { key:'name',type:'input',placeholder:'店铺名称',label:'店铺名称' },
]

export default function List() {
  const navigate = useNavigate()
  const tableRef = useRef(null)
  const [searchFormData,setSearchFormData] =useState({})

  const config=(type,id)=>{
    navigate(`/business/shop/${type}`,{state:{id}})
  }

  const columns = [
    { title: '店铺名称',dataIndex: 'name',key: 'name',},
    { title: '联系人', dataIndex: 'contact_person', key: 'contact_person',},
    { title: '联系人电话', dataIndex: 'contact_phone', key: 'contact_phone',},
    { title: '地址', dataIndex: 'address', key: 'address',},
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
    <div className={style.shop}>
      <SearchForm data={searchData} onFinish={onFinish} onValuesChange={onValuesChange}/>
      <DataTable ref={tableRef} columns={columns} buttons={[{label:'新增',onClick:()=>config('add')}]} params={searchFormData} api={shopList} rowKey='id' />
    </div>
  )
}
