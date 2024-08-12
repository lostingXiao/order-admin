
import { createHashRouter, Navigate,Link,useParams } from 'react-router-dom'
import { PieChartOutlined } from '@ant-design/icons';
import Layout from '../Layout/Layout'
// import Home from '../view/Home/Home'
// import Shop from '../view/Shop/List/List'
// import Set from '../view/Shop/List/Set/Set'

const router = createHashRouter([
  {
    path: 'login',
    title:'登录',
    async lazy() {
      const { default:Component } = await import("../view/Login/Login")
      return { Component }
    }
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'home',
        title:'首页',
        key:'首页',
        icon:<PieChartOutlined />,
        async lazy() {
          const { default:Home } = await import("../view/Home/Home")
          return { Component: Home }
        }
      },
      {
        path: 'business',
        title:'店铺',
        handle: {
          crumb: () => <span>商家</span>
        },
        children: [
          {
            path: 'mine',
            title:'我的店铺',
            handle: {
              crumb: () => <Link to="/business/mine">我的店铺</Link>
            },
            async lazy() {
              const { default:Mine } = await import("../view/Business/Mine/Mine")
              return { Component: Mine }
            }
          },
          {
            path: 'goods',
            title:'商品',
            handle: {
              crumb: () => <span>商品</span>
            },
            children:[
              {
                path: 'list',
                title:'列表',
                handle: {
                  crumb: () => <Link to="/business/googs/list">列表</Link>
                },
                async lazy() {
                  const { default:Component } = await import("../view/Business/Goods/Goods")
                  return { Component }
                }
              },
              {
                path: ':type',
                title:'设置',
                hide:true,
                handle: {
                  crumb: (params) => {
                    const { type } =params
                    return ( <span to="/business/goods/:type">{type==='add'?'新建':type==='edit'?'编辑':'详情'}</span>)
                  }
                },
                async lazy() {
                  const { default:Set } = await import("../view/Business/Goods/Set/Set")
                  return { Component: Set }
                }
              },
            ]
          },
          {
            path: 'decoration',
            title:'店铺装修',
            handle: {
              crumb: () => <Link to="/business/decoration">店铺装修</Link>
            },
            async lazy() {
              const { default:Decoration } = await import("../view/Business/Decoration/Decoration")
              return { Component: Decoration }
            }
          },
          {
            path: 'table',
            title:'餐桌',
            handle: {
              crumb: () => <Link to="/business/table">餐桌</Link>
            },
            async lazy() {
              const { default:Table } = await import("../view/Business/Table/Table")
              return { Component: Table }
            }
          },
          {
            path: 'shop',
            title:'店铺',
            handle: {
              crumb: () => <span>店铺</span>
            },
            children: [
              {
                path: 'list',
                title:'列表',
                handle: {
                  crumb: () => <Link to="/business/shop/list">列表</Link>
                },
                async lazy() {
                  const { default:Shop } = await import("../view/Business/Shop/Shop")
                  return { Component: Shop }
                }
              },
              {
                path: ':type',
                title:'设置',
                hide:true,
                handle: {
                  crumb: (params) => {
                    const { type } =params
                    return ( <span to="/business/list/:type">{type==='add'?'新建':type==='edit'?'编辑':'详情'}</span>)
                  }
                },
                async lazy() {
                  const { default:Set } = await import("../view/Business/Shop/Set/Set")
                  return { Component: Set }
                }
              },
            ],
          },
        ]
      },
      {
        path: 'system',
        title:'系统',
        handle: {
          crumb: () => <span>系统</span>
        },
        children: [
          {
            path: 'auth',
            title:'授权',
            handle: {
              crumb: () => <Link to='/system/auth'>授权</Link>
            },
            async lazy() {
              const { default:Component } = await import("../view/System/Auth/Auth")
              return { Component }
            }
          },
          {
            path: 'menu',
            title:'菜单',
            handle: {
              crumb: () => <Link to='/system/menu'>菜单</Link>
            },
            async lazy() {
              const { default:Component } = await import("../view/System/Menu/Menu")
              return { Component }
            }
          },
          {
            path: 'role',
            title:'角色',
            handle: {
              crumb: () => <span>角色</span>
            },
            children: [
              {
                path: 'list',
                title:'列表',
                handle: {
                  crumb: () => <Link to="/system/role/list">列表</Link>
                },
                async lazy() {
                  const { default:Component } = await import("../view/System/Role/Role")
                  return { Component }
                }
              },
              {
                path: ':type',
                title:'添加',
                hide:true,
                handle: {
                  crumb: (params) => {
                    const { type } =params
                    return ( <span to="/role/:type">{type==='add'?'新建':type==='edit'?'编辑':'详情'}</span>)
                  }
                },
                async lazy() {
                  const { default:Component } = await import("../view/System/Role/Set/Set")
                  return { Component }
                }
              },
            ]
          },
          {
            path: 'user',
            title:'用户',
            handle: {
              crumb: () => <span>用户</span>
            },
            children: [
              {
                path: 'list',
                title:'列表',
                handle: {
                  crumb: () => <Link to="/system/user/list">列表</Link>
                },
                async lazy() {
                  const { default:Component } = await import("../view/System/User/User")
                  return { Component: Component }
                }
              },
              {
                path: 'set/:type',
                title:'添加',
                hide:true,
                handle: {
                  crumb: (params) => {
                    const { type } =params
                    return ( <span>{type==='add'?'新建':type==='edit'?'编辑':'详情'}</span>)
                  }
                },
                async lazy() {
                  const { default:Set } = await import("../view/System/User/Set/Set")
                  return { Component: Set }
                }
              },
            ]
          },
        ]
      },
    ]
  },
  // {
  //   path: '/',
  //   hide:true,
  //   element: <Navigate to="/home"/>
  // }
])

export default router