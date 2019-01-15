import { /* ADMIN_ROLE, */ USER_ROLE } from '@/config/constantVariables'

import BasicLayout from '@/views/layouts/BasicLayout'

/*
 * 路由表
 * path : 路径
 * component: 视图组件
 * name: 路由别名  (用于跳转调用， next({name: name})、router.push({name:name})、redirect: { name: 'home' } 等  )
 * redirect: 重定向
 * hidden: 是否在菜单里隐藏
 * meta: 元信息
 */
export default [
  {
    path: '/roles',
    component: BasicLayout,
    meta: { title: '角色', icon: 'picture', noCache: true },
    children: [
      {
        path: 'admin',
        component: () => import(/* webpackChunkName: "routePage" */ '@/views/Admin'),
        name: 'admin',
        meta: { title: '管理员', icon: 'setting', noCache: true , roles: []},
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "routePage" */ '@/views/User'),
        name: 'user',
        meta: { title: '普通用户', icon: 'setting', noCache: true, roles: [USER_ROLE] },
      },
    ],
  },
  {
    path: '',
    component: BasicLayout,
    redirect: { name: 'home' },
    meta: { title: '主页111', icon: 'news', noCache: true },
    children: [
      {
        path: '/',
        component: () => import(/* webpackChunkName: "routePage" */ '@/views/Home'),
        name: 'home',
        meta: { title: '主页', icon: 'setting', noCache: true },
      },
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "routePage" */ '@/views/Login'),
    name: 'login',
    meta: { title: '登录页面'},
    hidden: true,
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "routePage" */ '@/views/exception/404'),
    name: 'page_404',
    meta: { title: '404 Not Found'},
    hidden: true,
  },
  {
    path: '/403',
    component: () => import(/* webpackChunkName: "routePage" */ '@/views/exception/403'),
    name: 'page_403',
    meta: { title: '403'},
    hidden: true,
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "routePage" */ '@/views/exception/401'),
    name: 'page_401',
    meta: { title: '401'},
    hidden: true
  },
  { 
    path: '*',
    redirect: '/404',
    // component: () => import(/* webpackChunkName: "routePage" */ '@/views/exception/404'),
    hidden: true 
  }
]



// export const asyncRouterMap = [
//   {
//     path: '/permission',
//     component: BasicLayout,
//     redirect: '/permission/index',
//     alwaysShow: true, // will always show the root menu
//     meta: {
//       title: 'permission',
//       icon: 'lock',
//       roles: [admin_role, user_role] // you can set roles in root nav
//     },
//     // children: [
//     //   {
//     //     path: 'page',
//     //     component: () => import('@/views/permission/page'),
//     //     name: 'PagePermission',
//     //     meta: {
//     //       title: 'pagePermission',
//     //       roles: ['admin'] // or you can only set roles in sub nav
//     //     }
//     //   },
//     // ]
//   }
// ]

