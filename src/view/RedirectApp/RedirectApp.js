import React, { useEffect } from 'react'
import style from './style.module.scss'
import { useSearchParams } from 'react-router-dom'
import { tableQrcodeUrl } from '../../api/business'
import { Button } from 'antd'

export default function RedirectApp() {
  const [searchParams] = useSearchParams()

  const redirect = async () => {
    const code = searchParams.get('code')
    const res = await tableQrcodeUrl({code})
    const redirectUrl = `${res.url}#/order?code=${code}`
    console.log(res)
    window.location.href = redirectUrl
  }


  useEffect(()=>{
    // redirect()
  },[])

  return (
    <div className={style.container}>
      <Button type="text" loading> 加载中...... </Button>
      <Button type="primary" onClick={redirect} > 跳转 </Button>
    </div>
  )
}