import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from '@/views/layouts/BasicLayout'

Vue.use(Router)

//通用路由
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/Login'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "page404" */ '@/views/exception/404'),
    hidden: true,
  },
  {
    path: '',
    redirect: 'home',
    component: BasicLayout,
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home'),
        name: 'Home',
        meta: { title: 'home', icon: 'dashboard', noCache: true },
      },
    ],
  },
  { path: '*', redirect: '/404', hidden: true },
]

export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
})
