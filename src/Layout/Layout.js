import React,{ useState } from 'react'
import { RouterProvider,HashRouter,Outlet } from 'react-router-dom'
import router from '../router'
import style from './Layout.module.scss'
import { Layout as AntdLayout } from 'antd'
import SiderNav from './components/SiderNav/SiderNav'
import BreadcrumbNav from './components/Breadcrumb/BreadcrumbNav'
import UserAvatar from './components/UserAvatar/UserAvatar'

const { Header, Content, Footer, Sider } = AntdLayout;

export default function Layout() {
  const [collapsed,setCollapsed]=useState(false)
  
  return (
    <AntdLayout className={style.layout}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}> 
        <SiderNav></SiderNav>
      </Sider>
      <AntdLayout>
        <Header>
          <UserAvatar />
        </Header>
        <Content className={style.content}>
          <BreadcrumbNav></BreadcrumbNav>
          <Outlet />
        </Content>
        <Footer className={style.footer}> 商家配置后台 ©{new Date().getFullYear()} Created by XIAO</Footer>
      </AntdLayout>
    </AntdLayout>
  )
}
