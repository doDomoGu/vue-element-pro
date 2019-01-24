import { ADMIN_ROLE, USER_ROLE } from '@/config/constantVariables'

import BasicLayout from '@/views/example/layouts/BasicLayout'
import BlankLayout from '@/components/layouts/BlankLayout'



const Home  = () => import(/* webpackChunkName: "routePage" */ '@/views/example/Home')
const Login  = () => import(/* webpackChunkName: "routePage" */ '@/views/example/Login')

const Page404  = () => import(/* webpackChunkName: "routePage" */ '@/components/exception/404')
const Page403  = () => import(/* webpackChunkName: "routePage" */ '@/components/exception/403')
const Page401  = () => import(/* webpackChunkName: "routePage" */ '@/components/exception/401')

const RolesAdmin  = () => import(/* webpackChunkName: "routePage" */ '@/views/example/roles/Admin')
const RolesUser  = () => import(/* webpackChunkName: "routePage" */ '@/views/example/roles/User')

const Theme  = () => import(/* webpackChunkName: "routePage" */ '@/views/example/Theme')

/*
 * 路由表配置 routerConfig
 * path : 路径 String
 * component: 视图组件 
 * name: 路由别名 String (用于跳转调用， next({name: name})、router.push({name:name})、redirect: { name: 'home' } 等  )
 * redirect: 重定向 String
 * meta: 元信息 Object { 
 *    title : 页面标题
 *    roles : 有权限的用户角色组， 没有表示不限制  
 * }
 * menu: 菜单设置 Object { 
 *    icon : 图标 (或者使用 icon_fa: 引入的font-awesome图标 参考 [http://fontawesome.dashgame.com])
 *    hidden: 在菜单里隐藏，子菜单(children)一并隐藏
 *    ignore: 忽略此层级，子菜单级数提升至此层  （用于layout/path嵌套）
 * }
 * children : [ {routerConfig},{routerConfig}...]  子路由/嵌套路由配置
 */
export default [
  {
    path: '',
    redirect: { name: 'home' },
    menu: { 
      hidden: true,
    },
  },
  {
    path: '/roles',
    component: BasicLayout,
    redirect: { name: 'admin' },
    meta: { 
      title: '角色' 
    },
    menu: { 
      icon: 'picture',
      // hidden: true,
      // ignore: true,
    },
    children: [
      {
        path: 'admin',
        component: RolesAdmin,
        name: 'admin',
        meta: { 
          title: '管理员',
          roles: [] 
        },
        menu: { 
          icon: 'setting',
          // hidden: true
        }
      },
      {
        path: 'user',
        component: BlankLayout,
        name: 'user',
        // meta: { title: '普通用户', icon: 'setting', noCache: true, roles: [USER_ROLE] },
        children: [
          {
            path: 'admin22',
            component: RolesAdmin,
            name: 'admin22',
            meta: { 
              title: '管理员',
              roles: [ ADMIN_ROLE ] 
            },
            menu: { 
              icon: 'picture' 
            }
          },
          {
            path: 'user22',
            component: RolesUser,
            name: 'user22',
            meta: { 
              title: '用户',
              roles: [ ADMIN_ROLE, USER_ROLE ] 
            },
            menu: { 
              icon: 'setting' 
            }
          },
        ],
      },
    ],
  },
  {
    path: '/xx',
    component: BasicLayout,
    redirect: { name: 'home' },
    meta: { 
      title: '主页-1',
      // roles: [] 
    },
    menu: { 
      icon: 'setting' 
    },
    children: [
      {
        path: '222DD',
        component: Home,
        name: 'home22',
        // redirect: { name: 'home33' },
        meta: { 
          title: '主页233' 
        },
        menu: { 
          icon: 'setting',
          
        },
      },
      {
        path: 'xx2',
        component: Home,
        // name: 'home',
        redirect: { name: 'home' },
        meta: { 
          title: '主页2' 
        },
        menu: { 
          icon: 'setting',
          
        },
        children: [
          {
            path: 'home',
            component: Home,
            name: 'home',
            meta: { title: '主页3-1' },
            menu: { icon_fa: 'gear' }
          },
          {
            path: '33',
            component: Home,
            name: 'home3-2',
            meta: { title: '主页3-2' },
            menu: { icon: 'setting' }
          }
        ]
      }
    ]
  },
  {
    path: '/22',
    component: BasicLayout,
    redirect: { name: 'home' },
    menu: { ignore: true },
    children: [
      {
        path: '/22',
        component: Home,
        name: 'home222',
        meta: { 
          title: '主页2' 
        },
        menu: { 
          icon: 'setting' 
        }
      }
    ]
  },
  {
    path: '',
    component: BasicLayout,
    menu: { ignore: true },
    children: [
      {
        path: 'theme',
        component: Theme,
        name: 'theme',
        meta: { title: '主题皮肤' },
        menu: { icon_fa: 'sliders'}
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: { title: '登录页面' },
    menu: { hidden: true}
  },
  {
    path: '/404',
    component: Page404,
    name: 'page_404',
    meta: { title: '404 Not Found'},
    menu: { hidden: true}
  },
  {
    path: '/403',
    component: Page403,
    name: 'page_403',
    meta: { title: '403'},
    menu: { hidden: true}
  },
  {
    path: '/401',
    component: Page401,
    name: 'page_401',
    meta: { title: '401'},
    menu: { hidden: true}
  },
  { 
    path: '*',
    redirect: '/404',
    menu: { hidden: true}
  }
]