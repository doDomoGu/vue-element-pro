// gulpfile.js
// var path = require('path')
var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css')
var cssWrap = require('gulp-css-wrap')
var concat=require('gulp-concat')   //合并文件
//var uglify=require('gulp-uglify'),   //js压缩 
// var rename=require('gulp-rename')   //文件重命名
// var jshint=require('gulp-jshint'),   //js检查
var notify=require('gulp-notify')   //提示
// var del = require('del')


/* 增加class名(命名空间) */
function purple_wrap() {
  return gulp.src('./purple/styles/index.css')
    /* 找需要添加命名空间的css文件，支持正则表达式 */
  .pipe(cssWrap({
      selector: '.custom-purple' /* 添加的命名空间 */
  }))
  .pipe(cleanCSS())
  .pipe(gulp.dest('./purple/styles')) /* 存放的目录 */
  .pipe(notify({message:'purple wrap class ok'}));   //提示成功
}

/* 打包并压缩css文件，生成单独的index.min.css */
function purple_minify() {
  return gulp.src('purple/styles/*.css')
  .pipe(concat('index.min.css'))      //合并css文件
  //.pipe(gulp.dest('./'))           //设置输出路径
  //.pipe(rename({suffix:'.min'}))         //修改文件名
  .pipe(cleanCSS())                    //压缩文件
  .pipe(gulp.dest('purple/styles/'))            //输出文件目录
  .pipe(notify({message:'purple minify ok'}))   //提示成功
}

exports.purple = gulp.series(purple_wrap, purple_minify)


/* 增加class名(命名空间) */
function teal_wrap() {
  return gulp.src('./teal/styles/index.css')
    /* 找需要添加命名空间的css文件，支持正则表达式 */
  .pipe(cssWrap({
      selector: '.custom-teal' /* 添加的命名空间 */
  }))
  .pipe(cleanCSS())
  .pipe(gulp.dest('./teal/styles')) /* 存放的目录 */
  .pipe(notify({message:'teal wrap class ok'}));   //提示成功
}

/* 打包并压缩css文件，生成单独的index.min.css */
function teal_minify() {
  return gulp.src('teal/styles/*.css')
  .pipe(concat('index.min.css'))      //合并css文件
  //.pipe(gulp.dest('./'))           //设置输出路径
  //.pipe(rename({suffix:'.min'}))         //修改文件名
  .pipe(cleanCSS())                    //压缩文件
  .pipe(gulp.dest('teal/styles/'))            //输出文件目录
  .pipe(notify({message:'teal minify ok'}))   //提示成功
}

exports.teal = gulp.series(teal_wrap, teal_minify)
