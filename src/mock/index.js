// 引入mockjs
import Mock from 'mockjs'

import AuthAPI from './modules/auth'
import UserAPI from './modules/user'
import AddressAPI from './modules/address'

// // 获取 mock.Random 对象
// const Random = Mock.Random;
// // mock一组数据
// const produceNewsData = function() {
//     let articles = [];
//     for (let i = 0; i < 100; i++) {
//         let newArticleObject = {
//             title: Random.csentence(5, 30), //  Random.csentence( min, max )
//             thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
//             author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
//             date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
//         }
//         articles.push(newArticleObject)
//     }
 
//     return {
//         articles: articles
//     }
// }
// // Mock.mock( url, post/get , 返回的数据)；
// Mock.mock('/news/index', 'post', produceNewsData);
Mock.mock(/\/auth\/login/, 'post', AuthAPI.login )
Mock.mock(/\/auth\/logout/, 'delete', AuthAPI.logout)
Mock.mock(/\/auth\/check-token/, 'post', AuthAPI.checkToken)

Mock.mock(/\/user\/info/, 'get', UserAPI.info)
Mock.mock(/\/address\/list/, 'get', AddressAPI.list)


// {"data":{"id":1,"name":"admin222","roles":["admin"]},"code":0,"msg":null}