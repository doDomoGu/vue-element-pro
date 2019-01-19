import { /* ADMIN_ROLE, */ USER_ROLE } from '@/config/constantVariables'

import BasicLayout from '@/views/layouts/BasicLayout'

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
 *    icon : 图标
 *    hidden: 在菜单里隐藏，子菜单(children)一并隐藏
 *    ignore: 忽略此层级，子菜单级数提升至此层  （用于layout/path嵌套）
 * }
 * children : [ {routerConfig},{routerConfig}...]  子路由/嵌套路由配置
 */
export default [
  {
    path: '/roles',
    component: BasicLayout,
    meta: { 
      title: '角色' 
    },
    menu: { 
      icon: 'picture',
      // hidden: true
    },
    children: [
      {
        path: 'admin',
        component: () => import(/* webpackChunkName: "routePage" */ '@/views/roles/Admin'),
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
        component: () => import(/* webpackChunkName: "routePage" */ '@/views/roles/User'),
        name: 'user',
        //meta: { title: '普通用户', icon: 'setting', noCache: true, roles: [USER_ROLE] },
        children: [
          {
            path: 'admin22',
            component: () => import(/* webpackChunkName: "routePage" */ '@/views/roles/Admin'),
            name: 'admin22',
            meta: { 
              title: '管理员',
              roles: [] 
            },
            menu: { 
              icon: 'setting' 
            }
          },
          {
            path: 'user22',
            component: () => import(/* webpackChunkName: "routePage" */ '@/views/roles/User'),
            name: 'user22',
            meta: { 
              title: '用户',
              roles: [ USER_ROLE ] 
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
    path: '',
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
        path: '',
        component: () => import(/* webpackChunkName: "routePage" */ '@/views/Home'),
        // name: 'home',
        redirect: { name: 'home' },
        meta: { title: '主页2' },
        menu: { icon: 'setting' },
        children: [
          {
            path: '22',
            component: () => import(/* webpackChunkName: "routePage" */ '@/views/Home'),
            name: 'home3-1',
            meta: { title: '主页3-1' },
            menu: { icon: 'setting' }
          },
          {
            path: '33',
            component: () => import(/* webpackChunkName: "routePage" */ '@/views/Home'),
            name: 'home3-2',
            meta: { title: '主页3-2' },
            menu: { icon: 'setting' }
          }
        ]
      }
    ]
  },
  {
    path: '',
    component: BasicLayout,
    redirect: { name: 'home' },
    children: [
      {
        path: '/2',
        component: () => import(/* webpackChunkName: "routePage" */ '@/views/Home'),
        name: 'home2',
        meta: { title: '主页2', icon: 'setting', noCache: true },
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "routePage" */ '@/views/Login'),
    name: 'login',
    meta: { title: '登录页面' },
    menu: { hidden: true}
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "routePage" */ '@/views/exception/404'),
    name: 'page_404',
    meta: { title: '404 Not Found'},
    menu: { hidden: true}
  },
  {
    path: '/403',
    component: () => import(/* webpackChunkName: "routePage" */ '@/views/exception/403'),
    name: 'page_403',
    meta: { title: '403'},
    menu: { hidden: true}
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "routePage" */ '@/views/exception/401'),
    name: 'page_401',
    meta: { title: '401'},
    menu: { hidden: true}
  },
  { 
    path: '*',
    redirect: '/404',
    // component: () => import(/* webpackChunkName: "routePage" */ '@/views/exception/404'),
    menu: { hidden: true}
  }
]