# 模拟接口数据  Mockjs

````

  /*
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
  *
  */

 ````
 