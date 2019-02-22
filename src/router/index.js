import Vue from 'vue'
import Router from 'vue-router'
import routerMap from './routerMap'

import store from '@/store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/authToken' // getToken from cookie
// import { ADMIN_ROLE } from '@/config/constantVariables'

Vue.use(Router)

// 声明router对象
const router = new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routerMap
})

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['login', 'auth-redirect']// 免登陆白名单

// 函数 hasPermission ：判断是否有权限  
// 参数 roles：当前用户拥有的权限角色  
// 参数 permissionRoles：这个路由允许的权限角色
function hasPermission(roles, permissionRoles) {
  // if (roles.indexOf(ADMIN_ROLE) >= 0) return true // 管理员角色 拥有所有权限
  if (!permissionRoles) return false  //permissionRoles为空 表示没有允许的角色 
  return roles.some(role => permissionRoles.indexOf(role) > -1)  //roles 和 permissionRoles 逐一匹配，有一个符合即可
}

// 有登录状态  进一步判断路由权限
const authTrue = function (to, from, next) {
  if (to.name === 'login') {
    next({ name : 'home' })
  } else {
    if(to.meta.roles) {
      if(hasPermission(store.getters['auth/userInfo']['roles'], to.meta.roles)){
        next()
      } else {
         //观测者权限 首页跳转到report
         /* if(role_id === report_role && (from.name === null || from.name === 'login')){
           next({ name: 'report' })
         }else{
           next({ name: 'page_403' })
         } */
         next({ name: 'page_403'})
      }
    }else {
      next()
    }
  }
}


// 无登录状态 跳转至登录页面
const authFalse = function (to, from, next) {
  if ( whiteList.indexOf(to.name) > -1 ) {
    next()
  } else {
    next({ name : 'login'})
  }
}
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  // 读取登录状态
  if (store.getters['auth/loginState']) {
    //已登录
    authTrue(to, from, next)
  } else {
    const token = getToken() // localStorage读取token
    if (token) {
      // 未登录 有token存在， 发送token验证请求
      store.dispatch('auth/CheckToken').then(() => {
        if (store.getters['auth/loginState']) {
          // 验证token成功
          store.dispatch('auth/GetInfo').then(() => {
            if(Object.keys(store.getters['auth/userInfo']).length > 0){
              //获取用户信息成功  
              authTrue(to, from, next)
            }else{
              //获取用户信息失败
              authTrue(to, from, next)
            }
          })
        } else {
          // 验证token错误 清空token
          authFalse(to, from, next)
        }
      })
    } else {
      // 未登录 也无token
      authFalse(to, from, next)
    }
  }
})


// const whiteList = ['login', 'auth-redirect']// 免登陆白名单

// router.beforeEach((to, from, next) => {
//   // NProgress.start() // start progress bar
//   if (getToken()) { // determine if there has token
//     /* has token*/
//     console.log(to)
//     if (to.name === 'login') {
//       next({ name: 'home' })
//       // NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
//     } else {
//       if (store.getters['user/id'] === -1) { // 当前用户信息还未拉取
//         store.dispatch('user/GetInfo').then( () => { // 拉取 user_info
//           if(store.getters['user/id'] > 0){
            
//           }

//           const roles = store.getters['user/roles'] // note: roles must be a array! such as: ['editor','develop']
//           store.dispatch('GenerateRoutes', { roles }).then(() => { 
//             router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//             next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
//           })
//         })/* .catch((err) => {
//           store.dispatch('FedLogOut').then(() => {
//             Message.error(err)
//             next({ path: '/' })
//           })
//         }) */
//       } else {
//         // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
//         if (hasPermission(store.getters['user/roles'], to.meta.roles)) {
//           next()
//         } else {
//           next({ name: '401', replace: true, query: { noGoBack: true }})
//         }
//         // 可删 ↑
//       }
//     }
//   } else {
//     // 本地没有Token
//     if (whiteList.indexOf(to.name) !== -1) { // 在免登录白名单，直接进入
//       next()
//     } else {
//       next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
//       // NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
//     }
//   }
// })

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

export default router