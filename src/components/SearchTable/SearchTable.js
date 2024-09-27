import React, { useRef,useEffect,useState } from 'react'
import DataTable from '../DataTable/DataTable'
import SearchForm from '../SearchForm/SearchForm'

export default function SearchTable({ searchData,rowKey,columns,buttons,api  }) {
  const tableRef = useRef(null)
  const [ initialValues, setInitialValues ] = useState({})
  const [ render, setRender ] = useState(false)

  const fliterInitialValues = ()=> {
    const init = {}
    searchData.forEach(item => {
      init[item.key]=item.value
    })
    setInitialValues(init)
    setRender(true)
  }

  useEffect(()=>{
    console.log('useEffect')
    console.log(searchData)
    fliterInitialValues()
  },[searchData])

  const onFinish=v=>{
    const values = { ...initialValues,...v }
    tableRef.current.onReset(values)
  }
  return (
    <>

      <div></div>
      <SearchForm data={searchData} onFinish={onFinish} />
      { render && <DataTable ref={tableRef} params={initialValues} columns={columns} buttons={buttons} api={api} rowKey={rowKey} /> }
    </>
  )
}
