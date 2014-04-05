var gulp = require('gulp');

var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var template = require('gulp-template');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var connect = require('gulp-connect');

var projectGlobals = {
  vendorscripts: ['src/js/vendor/jquery-2.1.0.min.js'
  ,'src/js/vendor/jquery-ui-1.10.4.custom.min.js'
  ,'src/js/vendor/underscore-min.js'
  ,'src/js/vendor/backbone-min.js'],
  coreScripts: ['src/js/core/*.js'],
  coreCss: ['src/css/core/*.css'],
  buildPathToClean: ['build/js/*.js','build/css/*.css','build/css/images/*.*','build/index.html'],
  coreBuildPathToClean: ['build/js/edWui.min.js','build/css/edWui.min.css','build/index.html'],
  vendorCss:['src/css/vendor/*.css'],
  vendorCssImages:['src/css/vendor/images/*.*']
};

//default task
gulp.task('default',['clean', 'buildVendor','buildCore','buildAppIndex']);

//build vendor files
gulp.task('buildVendor',['vendorscripts','vendorcss','copyCssImages']);

//build core files
gulp.task('buildCore',['corescripts','coreCss']);

//quick build
gulp.task('quick',['coreclean','buildCore','buildAppIndex']);


// Delete the build directories
gulp.task('coreclean', function() {
return gulp.src(projectGlobals.coreBuildPathToClean)
.pipe(clean());
});

// Delete the core build directories
gulp.task('clean', function() {
return gulp.src(projectGlobals.buildPathToClean)
.pipe(clean());
});

//build vendor js
gulp.task('vendorscripts', function() {
  return gulp.src(projectGlobals.vendorscripts)
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('build/js'));
});

//build vendor css
gulp.task('vendorcss', function() {
  return gulp.src(projectGlobals.vendorCss)
     .pipe(minifyCSS())
     .pipe(concat('/vendor.min.css'))
    .pipe(gulp.dest('build/css'));
});

//copy jQuery UI images
gulp.task('copyCssImages',function(){

gulp.src(projectGlobals.vendorCssImages)
  .pipe(gulp.dest('./build/css/images'));
})

//build core script
gulp.task('corescripts', function() {
  return gulp.src(projectGlobals.coreScripts)
    .pipe(uglify())
    .pipe(concat('edWui.min.js'))
    .pipe(gulp.dest('build/js'));
});

//build core script
gulp.task('coreCss', function() {
  return gulp.src(projectGlobals.coreCss)
    .pipe(minifyCSS())
    .pipe(concat('edWui.min.css'))
    .pipe(gulp.dest('build/css'));
});

//build app index
gulp.task('buildAppIndex', function () {
    gulp.src(['src/app_view/header.html','src/app_view/index.html','src/app_view/footer.html'])
        .pipe(concat('index.html'))
        .pipe(template({
        scripts:["./js/vendor.min.js","./js/edWui.min.js"],
         css:["./css/vendor.min.css","./css/edWui.min.css"]
        }))
        .pipe(minifyHTML())
        .pipe(gulp.dest('./build'));
});


//start a local webserver
gulp.task('connect', function() {
  connect.server({
    root: ['build'],
    port: 1337,
    livereload: true
  });
});