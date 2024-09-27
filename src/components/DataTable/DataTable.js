import React,{ useState,useEffect,useImperativeHandle,forwardRef } from 'react'
import { Table,Row,Button,Space } from "antd"
import style from './DataTable.module.scss'

const DataTable = forwardRef(({params,columns,buttons,api,rowKey,pageSize},ref)=> {
  const [ tableData,setTableData ] =useState([])
  const [ total,setTotal] =useState(0)

  const getList = async (pageNum,param)=>{
    const _pageSize=pageSize||10
    const pars=param||params
    const res = await api({ ...pars,pageNum:pageNum,pageSize:_pageSize })
    const { total,list } = res
    setTableData(list)
    setTotal(total)
  }

  const tableChange=(v)=>{
    getList(v.current)
  }
  
  useImperativeHandle(ref, () => ({
    onReset: (params) => {
      getList(1,params)
    }
  }));

  useEffect(() => {
    getList(1)
  }, [params])
  
  return (
    <div>
      {
        buttons?<Row className={style.buttons}>
          <Space>
            {buttons.map((item,index)=>(
              <Button key={index} type="primary" onClick={item.onClick}>{item.label}</Button>
            ))}
          </Space>
        </Row>:''
      }
      <Table 
        dataSource={tableData} 
        columns={columns} 
        pagination={{
          showTotal:(total) =>`共 ${total} 条`,
          pageSize,
          total:total,
        }} 
        rowKey={rowKey||'id'} 
        onChange={tableChange} />
    </div>
  )
})

export default DataTable