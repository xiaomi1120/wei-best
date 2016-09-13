var gulp=require('gulp');
// 获取 uglify 模块（用于压缩 JS）
var less=require('gulp-less');
var minifyCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
// 获取 minify-css 模块（用于压缩 CSS）
var rename = require('gulp-rename');
var connect = require('gulp-connect');
////用于测试gulp
//gulp.task('default',function(){
//console.log("你好")
//});
gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        port: 2333
    });
});
// 压缩 css 文件
// 在命令行使用 gulp css 启动此任务
//gulp.task('css',function(){
//    //noinspection JSUnresolvedFunction
//    gulp.src('./src/assets/css/*.css')
//        .pipe(minifyCSS())
//        .pipe(gulp.dest('dist/css'))
//});

gulp.task('lessWei', function() {
     //noinspection JSUnresolvedFunction
    gulp.src('./src/assets/less/index.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(rename({
            dirname:'/',
            extname:'.min.css'
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());

});
// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('script',function(){
    // 1. 找到文件
    //noinspection JSUnresolvedFunction
    gulp.src('./src/assets/js/*.js')
        // 2. 压缩文件
        .pipe(uglify())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'))
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto',function(){
    gulp.watch('js/*.js',['script']);
    //gulp.watch('css/*.css',['css']);
    gulp.watch('./src/assets/less/*.less',['lessWei']);
});

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
gulp.task('default', ['script','lessWei', 'auto','webserver'],function (){
    console.log('success');
});