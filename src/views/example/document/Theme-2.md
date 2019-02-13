# 多主题（动态换肤）

## 本项目通过生成多套已经编译好的css（代码在src/assets/custom-theme下），并使用在body元素上增加和更改class名（皮肤的命名空间）来达到动态换肤的效果。

> 给css批量增加class选择器，需要用到 gulp 构建工具。   
> 以及在本项目中额外的打包压缩css文件也需要用到gulp工具   
> 所以需要了解一些gulp的基本使用方法

## *以下操作脱离项目代码，只需将生成的样式文件放入项目即可*

### 在临时目录（自行放置在其他目录）新建node项目
```
npm init -y
```
---
### 安装sass-loader，使项目支持sass扩展 (可能已经安装过了，自行检查)
```
npm i sass-loader node-sass -D
```
---
### 安装 element-theme 命令行工具 之后可以使用 et 命令
```
npm i element-theme -D
```
---
### 安装 theme-chalk  官方默认主题
```
npm i element-theme-chalk -D
```
---
### 生成初始element-variables.scss文件
```
et -i
```
---
### 修改scss文件
	
我们分别创建两个目录 teal 和 purple，并将element-variables.scss在这两个目录下各复制一份

分别找到这一行 "$--color-primary: #409EFF !default;"

teal目录下的: 修改为 $--color-primary: teal !default;   
purple目录下的: 修改为 $--color-primary: purple !default;

---

### 编译scss文件，生成css
```
et

/* or */ 

et -c ./teal/element-variables.scss -o ./teal/styles/   

et -c ./purple/element-variables.scss -o ./purple/styles/
```

### 安装gulp 及相关库
```
npm install -g gulp

npm install gulp-clean-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-notify gulp-css-wrap -D
```

### gulp脚本 详见src/assets/custom-theme/gulpfile.js
```
gulp purple
gulp teal
```
分别在styles目录下生成index.min.css，将这个文件和fonts目录复制到src/assets/custom-theme/ 对应的主题目录(purple/teal)


### 在main.js中添加如下代码，引入主题样式
````js
import '@/assets/custom-theme/purple/index.min.css' 
import '@/assets/custom-theme/teal/index.min.css' 
````

### 在Vue页面中，使用js修改body的class
```js

document.body.className = 'custom-purple' //purple主题

/* or */

document.body.className = 'custom-teal' //teal主题

/* or */

document.body.className = ''  //还原到默认主题
```


