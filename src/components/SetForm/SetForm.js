import React from 'react'
import style from './SetForm.module.scss'
import { useLocation,useNavigate,useParams } from 'react-router-dom'
import { PlusSquareOutlined,FormOutlined,FundViewOutlined,LogoutOutlined,TagOutlined,BookOutlined } from '@ant-design/icons'


export default function SetForm({children}) {
  const navigate=useNavigate()
  const { type } = useParams()

  const back=()=>{
    navigate(-1)
  }

  console.log(type)

  return (
    <div className={style.setform}>
      <div className={style.page}>
        <div className={style.item}>
          {type==='add'?<PlusSquareOutlined />:type==='edit'?<FormOutlined />:<FundViewOutlined />}
          <span className={style.text}> {type==='add'?'新建':type==='edit'?'编辑':'详情'}</span>
        </div>
        <LogoutOutlined onClick={()=>navigate(-1)}></LogoutOutlined>
      </div>
      <div className={style.form}>
        {children}
      </div>
    </div>
  )
}