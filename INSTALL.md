# 安装说明

进入项目目录，安装npm模块依赖包 (需要 `node` 和 `npm` 环境，自行安装)
```
npm install
```
会自动生成node_modules目录，里面是项目所需的node依赖包


## _下面分为生产环境和本地开发环境的构建_
---
### 生产环境
配置文件是 `.env.production`   
配置项:
```
VUE_APP_API_PREFIX = http://***    

#接口Base_url 比如你的接口地址是 http://abc.com/auth/login 那么就设置为http://abc.com 最后不需要带斜杠
```

然后运行
```
npm run build
```
执行完毕会生成一个 `dist` 目录
将你的前端服务目录指向这个目录的index.html

因为本项目使用vue-router的history模式，web服务器需要做一定的配置，这里以nginx为例

```
location / {
  try_files $uri $uri/ /index.html;
}
```
这样刷新路由不会404了


---
#### 本地开发环境
配置文件是 `.env.development`   
配置项:
```
VUE_APP_API_PREFIX = http://***    

#接口Base_url 比如你的接口地址是 http://abc.com/auth/login 那么就设置为http://abc.com 最后不需要带斜杠

VUE_APP_MOCK_ENABLE = FALSE  // or TRUE
#如果启用MOCK则上面的API_PREFIX失效，会用src/mock下设置的模拟接口数据作拦截
```

然后运行
```
npm run serve
```
执行完毕，会生成一个端口用于本地web访问，默认为http://localhost:8080

---
### 如果你build后的web项目需要部署在子目录，需要额外完成以下步骤
配置文件 `.env.production` 中的配置项：   
```
VUE_APP_PUBLIC_PATH = '/www/vue-element-pro/dist/'

# 这个选项会影响到 vue.config.js 中的publicPath 和 router的 base 
# 如 你的项目访问地址是 http://abc.com/edf/ 则需要将这个值设置为 '/edf/'
```
因为我们使用router的history模式，相应的web服务器也需要做修改，这里以nginx为例
```
server {
    listen       80;
    server_name  abc.com;  #你的域名
    root /data/html;       
    index  index.html index.htm;
    location /edf {
      alias /data/html/xxx;  #项目所在目录
      try_files $uri $uri/edf/ /edf/index.html; #这条是核心语句 try_files url重写
    }
}
```