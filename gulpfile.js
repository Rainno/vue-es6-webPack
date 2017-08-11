var webpackConfig = require('./webpack.config.js');
// 引入 gulp
var gulp = require('gulp');
var webpack = require("webpack");
// 引入组件
var plugins = require('gulp-load-plugins')();//加载其他插件
require('gulp-connect');

//配置
jshint_config = {
    eqeqeq: false,
    forin: false,
    debug: true,
    asi: false,
    strict: false
};
autoprefixer_config = {
    browsers: [
        'last 2 versions',
        'safari 5',
        'ie 8',
        'ie 9',
        'ie 6-7',
        'opera <= 12',
        'ios <= 8',
        'android <= 4',
        'Firefox <= 20'
    ],
    cascade: true,
    remove: false
};

// 编译Sass
gulp.task('sass', function () {
    gulp.src('./styles/**/*.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer(autoprefixer_config))
        .pipe(gulp.dest('./projects/'))
        .pipe(plugins.connect.reload());
});
// 检查脚本
gulp.task('lint', function () {
    gulp.src('./scripts/!(vendor)/*.js')
        .pipe(plugins.jshint(jshint_config))
        .pipe(plugins.jshint.reporter('default'));
    //.pipe(plugins.connect.reload());
});
//babel
gulp.task('babel', function () {
    gulp.src('./es6/**/*.js')
        .pipe(plugins.plumber())
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./projects/'));
    // .pipe(plugins.connect.reload());
});
// 合并，压缩文件
gulp.task('scripts', function () {
    gulp.src('./scripts/*.js')
        .pipe(plugins.concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(plugins.rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
});
gulp.task('webserver', function () {
    plugins.connect.server({
        livereload: true,
        port: 8088
        //host: '10.0.15.103'
        // host: '192.168.0.101'
    });
});
gulp.task('html', function () {
    gulp.src('./projects/**/*.html')
        .pipe(plugins.connect.reload());
});

gulp.task('js', function () {
    gulp.src('./projects/**/*.js')
        .pipe(plugins.connect.reload());
});

gulp.task('css', function () {
    gulp.src('./projects/**/*.css')
        .pipe(plugins.connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./projects/**/*.html'], ['html']);
    gulp.watch(['./*.html'], ['html']);
    gulp.watch('./styles/**/*.scss', ['sass']);
    gulp.watch('./es6/**/*.js', ['babel']);
    plugins.watch('./projects/**/*.js')
        .pipe(plugins.connect.reload());
    // plugins.watch('./projects/**/*.css')
    //   .pipe(plugins.connect.reload());
    // gulp.watch('./projects/**/*.css', ['css']);
    // plugins.watch('./scripts/**/*.js')
    //   .pipe(plugins.connect.reload());
});
// 默认任务
gulp.task('default', function () {
    gulp.run('sass', 'watch', 'webserver', 'babel');
});





/*
gulp.task("webpack", function(callback) {
    var myConfig = Object.create(webpackConfig);
    webpack(myConfig, function(err, stats) {
        callback();
    });
});
gulp.task('watchVue',function(){
    gulp.watch(['resource/js/!**!/!*.vue','resource/js/!**!/!*.js'], ['webpack']);
});*/
