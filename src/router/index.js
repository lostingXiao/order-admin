
import { createHashRouter, Navigate,Link,useParams } from 'react-router-dom'
import { PieChartOutlined } from '@ant-design/icons';
import Layout from '../Layout/Layout'
// import Home from '../view/Home/Home'
// import Shop from '../view/Shop/List/List'
// import Set from '../view/Shop/List/Set/Set'

const router = createHashRouter([
  {
    path: 'login',
    key: 'login',
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
        key: 'home',
        title:'首页',
        icon:<PieChartOutlined />,
        async lazy() {
          const { default:Home } = await import("../view/Home/Home")
          return { Component: Home }
        }
      },
      {
        path: 'business',
        key: 'business',
        title:'店铺',
        handle: {
          crumb: () => <span>商家</span>
        },
        children: [
          {
            path: 'businessMine',
            key: 'businessMine',
            title:'我的店铺',
            handle: {
              crumb: () => <Link to="/business/businessMine">我的店铺</Link>
            },
            async lazy() {
              const { default:Mine } = await import("../view/Business/Mine/Mine")
              return { Component: Mine }
            }
          },
          {
            path: 'businessGoods',
            key: 'businessGoods',
            title:'商品',
            handle: {
              crumb: () => <span>商品</span>
            },
            children:[
              {
                path: 'businessGoodsList',
                key: 'businessGoodsList',
                title:'列表',
                handle: {
                  crumb: () => <Link to="/business/businessGoods/businessGoodsList">列表</Link>
                },
                async lazy() {
                  const { default:Component } = await import("../view/Business/Goods/Goods")
                  return { Component }
                }
              },
              {
                path: ':type',
                key: 'businessGoodsConfig',
                title:'设置',
                hide:true,
                handle: {
                  crumb: (params) => {
                    const { type } =params
                    return ( <span to="/business/businessGoods/:type">{type==='add'?'新建':type==='edit'?'编辑':'详情'}</span>)
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
            path: 'businessGoodType',
            key: 'businessGoodType',
            title:'商品分类',
            handle: {
              crumb: () => <span>商品</span>
            },
            children:[
              {
                path: 'businessGoodTypeList',
                key: 'businessGoodTypeList',
                title:'列表',
                handle: {
                  crumb: () => <Link to="/business/businessGoodType/businessGoodTypeList">列表</Link>
                },
                async lazy() {
                  const { default:Component } = await import("../view/Business/GoodType/GoodType")
                  return { Component }
                }
              },
              {
                path: ':type',
                key: 'businessGoodTypeConfig',
                title:'设置',
                hide:true,
                handle: {
                  crumb: (params) => {
                    const { type } =params
                    return ( <span to="/business/businessGoodType/:type">{type==='add'?'新建':type==='edit'?'编辑':'详情'}</span>)
                  }
                },
                async lazy() {
                  const { default:Set } = await import("../view/Business/GoodType/Set/Set")
                  return { Component: Set }
                }
              },
            ]
          },
          {
            path: 'businessDecoration',
            key: 'businessDecoration',
            title:'店铺装修',
            handle: {
              crumb: () => <Link to="/business/businessDecoration">店铺装修</Link>
            },
            async lazy() {
              const { default:Decoration } = await import("../view/Business/Decoration/Decoration")
              return { Component: Decoration }
            }
          },
          {
            path: 'businessTable',
            key: 'businessTable',
            title:'餐桌',
            handle: {
              crumb: () => <Link to="/business/businessTable">餐桌</Link>
            },
            async lazy() {
              const { default:Table } = await import("../view/Business/Table/Table")
              return { Component: Table }
            }
          },
          {
            path: 'businessShop',
            key: 'businessShop',
            title:'店铺',
            handle: {
              crumb: () => <span>店铺</span>
            },
            children: [
              {
                path: 'businessShopList',
                key: 'businessShopList',
                title:'列表',
                handle: {
                  crumb: () => <Link to="/business/businessShop/businessShopList">列表</Link>
                },
                async lazy() {
                  const { default:Shop } = await import("../view/Business/Shop/Shop")
                  return { Component: Shop }
                }
              },
              {
                path: ':type',
                key: 'businessShopConfig',
                title:'设置',
                hide:true,
                handle: {
                  crumb: (params) => {
                    const { type } =params
                    return ( <span to="/business/businessShop/:type">{type==='add'?'新建':type==='edit'?'编辑':'详情'}</span>)
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
        key: 'system',
        title:'系统',
        handle: {
          crumb: () => <span>系统</span>
        },
        children: [
          {
            path: 'systemAuth',
            key: 'systemAuth',
            title:'授权',
            handle: {
              crumb: () => <Link to='/system/systemAuth'>授权</Link>
            },
            async lazy() {
              const { default:Component } = await import("../view/System/Auth/Auth")
              return { Component }
            }
          },
          {
            path: 'systemMenu',
            key: 'systemMenu',
            title:'菜单',
            handle: {
              crumb: () => <Link to='/system/systemMenu'>菜单</Link>
            },
            async lazy() {
              const { default:Component } = await import("../view/System/Menu/Menu")
              return { Component }
            }
          },
          {
            path: 'systemRole',
            key: 'systemRole',
            title:'角色',
            handle: {
              crumb: () => <span>角色</span>
            },
            children: [
              {
                path: 'systemRoleList',
                key: 'systemRoleList',
                title:'列表',
                handle: {
                  crumb: () => <Link to="/system/systemRole/systemRoleList">列表</Link>
                },
                async lazy() {
                  const { default:Component } = await import("../view/System/Role/Role")
                  return { Component }
                }
              },
              {
                path: ':type',
                key: 'systemRoleConfig',
                title:'添加',
                hide:true,
                handle: {
                  crumb: (params) => {
                    const { type } =params
                    return ( <span to="/system/systemRole/:type">{type==='add'?'新建':type==='edit'?'编辑':'详情'}</span>)
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
            path: 'systemUser',
            key: 'systemUser',
            title:'用户',
            handle: {
              crumb: () => <span>用户</span>
            },
            children: [
              {
                path: 'systemUserList',
                key: 'systemUserList',
                title:'列表',
                handle: {
                  crumb: () => <Link to="/system/systemUser/systemUserList">列表</Link>
                },
                async lazy() {
                  const { default:Component } = await import("../view/System/User/User")
                  return { Component: Component }
                }
              },
              {
                path: ':type',
                key: 'systemUserConfig',
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
  {
    path: '/',
    hide:true,
    element: <Navigate to='home' replace/>
  }
])

export default router