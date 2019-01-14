import { /* ADMIN_ROLE, */ USER_ROLE } from '@/config/constantVariables'

import BasicLayout from '@/views/layouts/BasicLayout'


//通用路由
export default [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "routePage" */ '@/views/Login'),
    name: 'login',
    hidden: true,
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "routePage" */ '@/views/exception/404'),
    name: 'page_404',
    hidden: true,
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "routePage" */ '@/views/exception/401'),
    name: 'page_401',
    hidden: true,
  },
  {
    path: '',
    redirect: 'home',
    component: BasicLayout,
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "routePage" */ '@/views/Home'),
        name: 'home',
        meta: { title: 'home', icon: 'dashboard', noCache: true },
      },
      {
        path: 'admin',
        component: () => import(/* webpackChunkName: "routePage" */ '@/views/Admin'),
        name: 'admin',
        meta: { title: 'home', icon: 'dashboard', noCache: true , roles: []},
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "routePage" */ '@/views/User'),
        name: 'user',
        meta: { title: 'user', icon: 'dashboard', noCache: true, roles: [USER_ROLE] },
      },
    ],
  },
  { path: '*', redirect: '/404', hidden: true },
  // {
  //   path: '*',
  //   component: () => import(/* webpackChunkName: "routePage" */ '@/views/exception/404'),
  //   name: 'page_404',
  //   hidden: true,
  // },
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

