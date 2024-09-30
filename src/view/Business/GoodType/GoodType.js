import React from 'react'
import { useNavigate } from 'react-router-dom'
// import style from './Shop.module.scss'
import { observer } from 'mobx-react-lite'
import { goodsTypesList } from '../../../api/business'
import { useStore } from '../../../store'
import { Space,Button } from 'antd'
import SearchTable from '../../../components/SearchTable/SearchTable'

function GoodType() {
  const navigate = useNavigate()
  const { user } = useStore()
  const { shopId } = user

  const config=(type,id)=>{
    navigate(`/business/businessGoodType/${type}`,{state:{id}})
  }

  const searchData=[
    { key:'shopId',hide:true,value:shopId },
    { key:'name',type:'input',placeholder:'类型名称',label:'类型名称' },
  ]

  const columns = [
    { title: '店铺名称',dataIndex: 'name',key: 'name',},
    { title: '归属店铺',dataIndex: 'shop_name',key: 'shop_name',},
    { title: '创建时间', dataIndex: 'created_at', key: 'created_at',},
    { title: '跟新时间', dataIndex: 'updated_at', key: 'updated_at',},
    { title: '操作', key: 'index', 
      render: (text, record, index) => {
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
    <div>
      <SearchTable rowKey='id' searchData={searchData} columns={columns} buttons={[{label:'新增',onClick:()=>config('add')}]} api={goodsTypesList}  />
    </div>
  )
}

export default observer(GoodType)
