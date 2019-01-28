# Element-ui 自定义主题 使用说明

Element-ui使用scss(sass)扩展管理样式，可以很方便的只修改几个变量，达到替换多个的效果

1. 首先安装sass-loader，使项目支持sass扩展 (可能已经安装过了，自行检查)

        npm i sass-loader node-sass -D

2. 安装 element-theme 命令行工具 之后可以使用 et 命令
      
        npm i element-theme -D

3. 安装 theme-chalk  官方默认主题

        npm i element-theme-chalk -D

4. 初始化 主题scss文件
	
        et -i // 默认的保存文件是element-variables.scss，也可以自定义文件名 et --init [filePath]

5. 尝试修改scss文件 样式的变量 将主色从#409EFF(亮蓝) 改为 红色

      ````css
        /*  $--color-primary: #409EFF !default; */  
        $--color-primary: red !default;
      ````
		
6. 引入自定义主题

	在命令行里执行 et 编译主题，如果你想启用 watch 模式，实时编译主题，增加 -w 参数；如果你在初始化时指定了自定义变量文件，则需要增加 -c 参数，并带上你的变量文件名

        et  
        /* or */
        et -c [filePath]

    默认情况下编译的主题目录是放在 ./theme 下，你可以通过 -o 参数指定打包目录。

        et -c [filePath] -o [dirPath]  


    像引入默认主题一样，在代码里直接引用 theme/index.css 文件即可。

      ````js
        import '../theme/index.css'
        import ElementUI from 'element-ui'
        import Vue from 'vue'

        Vue.use(ElementUI)
      ````

    或者
    
    可以不生成css文件 直接使用scss配置文件覆盖 原主题变量

	  element-variables.scss 文件只需保留修改的几项，在最后加上一行

      ````js

        @import "~element-ui/packages/theme-chalk/src/index";

      ````

	  我将文件保存到src/config/下 （自行查看和参考)

      ````js

        import '@/config/element-variables.scss'
        import Element from 'element-ui'
	      
        Vue.use(Element)

      ````
-----

#多主题（动态换肤）

生成多套已经编译好的css，并使用命名空间区分开

1. 生成初始element-variables.scss文件

        et -i

2. 修改scss文件，编写自己需要的样式

3. 生成css文件包

        et 

        /* or */
        
        // 如果有自己设置过配置文件(element-variables.scss) 和 需要生成到指定目录
        et -c ./src/assets/custom-theme/purple/element-variables.scss -o ./src/assets/custom-theme/purple/styles/

4. 安装gulp（gulp是一个前端构建工具)，用来给css文件批量增加命名空间

        npm install --global gulp

5. 在项目根目录下创建一个名为 gulpfile.js 的文件：

      ````javascript
        // gulpfile.js
        var path = require('path')
        var gulp = require('gulp')
        var cleanCSS = require('gulp-clean-css')
        var cssWrap = require('gulp-css-wrap')
        gulp.task('css-wrap', function () {
            return gulp.src(path.resolve('../vue-element-pro/src/assets/custom-theme/teal/styles/index.css'))
            /* 找需要添加命名空间的css文件，支持正则表达式 */
                .pipe(cssWrap({
                    selector: '.custom-teal' /* 添加的命名空间 */
                }))
                .pipe(cleanCSS())
                .pipe(gulp.dest(path.resolve('../vue-element-pro/src/assets/custom-theme/teal/styles'))) /* 存放的目录 */
        })

        gulp.task('css-wrap-purple', function () {
            return gulp.src(path.resolve('../vue-element-pro/src/assets/custom-theme/purple/styles/index.css'))
            /* 找需要添加命名空间的css文件，支持正则表达式 */
                .pipe(cssWrap({
                    selector: '.custom-purple' /* 添加的命名空间 */
                }))
                .pipe(cleanCSS())
                .pipe(gulp.dest(path.resolve('../vue-element-pro/src/assets/custom-theme/purple/styles'))) /* 存放的目录 */
        })
      ````

6. 运行gulp

        gulp css-wrap

7.  将生成的index.css 替换原theme中的index.css

8.  使用如下代码 引入主题 

      ````js
        
        import '@assets/custom-theme/purple/styles/index.css'
        import ElementUI from 'element-ui'
        import Vue from 'vue'

        Vue.use(ElementUI)

      ````



