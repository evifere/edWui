//tasks imports
var gulp       = require('gulp');
var runSeq     = require('run-sequence');
var fs         = require('fs');
var es         = require('event-stream');
var clean      = require('gulp-clean');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var template   = require('gulp-template');
var imagemin   = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var minifyCSS  = require('gulp-minify-css');
var connect    = require('gulp-connect');
var partials   = require('gulp-partial-to-script');
var xml2json   = require('gulp-xml2json');
var rename     = require('gulp-rename');
var jeditor    = require("gulp-json-editor");
var jsonfile   = require("jsonfile");
var tap        = require("gulp-tap");
var pathUtil   = require('path');
var gulpIf     = require('gulp-if');
var debug      = require('gulp-debug');
var imagemin   = require('gulp-imagemin');

//globals project variables
var projectGlobals = {
  vendorscripts: ['node_modules/jquery/dist/jquery.min.js',
  'node_modules/jquery-migrate/dist/jquery-migrate.min.js',
  ,'src/js/vendor/jquery.cookie.js'
  ,'node_modules/underscore/underscore-min.js'
  ,'node_modules/backbone/backbone-min.js'],
  coreScripts: ['src/js/core/edWuiBootStrap.js'
  ,'src/views/*.js'
  ,'src/js/core/edWuiTools.js'
  ,'src/js/core/edWuiLoadData.js'
  ,'src/js/core/edWuiRouter.js'
  ,'src/js/core/edWui.js'],
  coreCss: ['src/css/core/*.css'],
  buildPath:"build/",
  buildPathToClean: ['build/js/*.js','build/css/*.css','build/css/images/*.*','build/*.html','build/json/memo/pair/*.json'],
  coreBuildPathToClean: ['build/js/edWui.min.js','build/css/edWui.min.css','build/*.html'],
  vendorCss:['src/css/vendor/spectre*.css'],
  vendorCssImages:['src/css/vendor/images/*.*']
};

//default task
gulp.task('default', function() {
      return runSeq('clean', ['buildVendor', 'buildCore', 'buildBoardJsonDatas']);
      });

//build vendor files
gulp.task('buildVendor',['vendorscripts','vendorcss'/*,'copyCssImages'*/]);

//build core files
gulp.task('buildCore',['corescripts','coreCss']);

//quick build
gulp.task('quick',['coreclean','buildCore','buildBoardJsonDatas']);


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

// Delete the intermediate generated file
gulp.task('endclean', function() {
return gulp.src(projectGlobals.buildPath + 'templates.html')
.pipe(clean());
});


//build vendor js
gulp.task('vendorscripts', function() {
  return gulp.src(projectGlobals.vendorscripts)
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest(projectGlobals.buildPath + '/js'));
});

//build vendor css
gulp.task('vendorcss', function() {
  return gulp.src(projectGlobals.vendorCss)
     .pipe(minifyCSS())
     .pipe(concat('/vendor.min.css'))
    .pipe(gulp.dest(projectGlobals.buildPath + 'css'));
});

//copy jQuery UI images
gulp.task('copyCssImages',function(){

gulp.src(projectGlobals.vendorCssImages)
  .pipe(gulp.dest(projectGlobals.buildPath + 'build/css/images'));
})

//build core script
gulp.task('corescripts', function() {
  return gulp.src(projectGlobals.coreScripts)
    /*.pipe(uglify())*/
    .pipe(concat('edWui.min.js'))
    .pipe(gulp.dest(projectGlobals.buildPath + 'js'));
});

gulp.task('buildBoardJsonDatas', function () {

 var indexBoard  = [];
 var currentFile = "";
 var currentBoardPath = "";

 process.jsonDatasToLoad = [];

 return gulp.src('src/app_data/xml/**/*.xml')
        .pipe(xml2json())
        .pipe(rename({extname: '.json'}))
        .pipe(tap(function (file,t) {
            currentFile = file.relative;
            currentBoardPath = pathUtil.dirname(file.relative);
            console.log(currentBoardPath);
            process.jsonDatasToLoad.push(currentFile);
        }))
        .pipe(jeditor(function(json) {
            indexBoard.push({
            'title':json.board.title,
            'description':json.board.description,
            'boardFile':'/json/'+currentFile,
            'decks':json.board.decks
            });
            return json; // must return JSON object.
        }))
        .pipe(gulp.dest(projectGlobals.buildPath + '/json'))
        .on('end',function(){
            process.jsonDatasToLoad.push(currentBoardPath+'/boards.json');
            jsonfile.writeFileSync(projectGlobals.buildPath + '/json/'+currentBoardPath+'/boards.json', indexBoard);
             console.log(process.jsonDatasToLoad);
             gulp.run('buildAppIndex');
        });
});

//build core script
gulp.task('coreCss', function() {
  return gulp.src(projectGlobals.coreCss)
    .pipe(minifyCSS())
    .pipe(concat('edWui.min.css'))
    .pipe(gulp.dest(projectGlobals.buildPath + '/css'));
});

//build templates
gulp.task('buildTemplates', function () {

 gulp.src('src/partials/*.html')
    .pipe(partials());
});


// Copy all static images
gulp.task('copyImg', function() {
 return gulp.src('img/**')
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(projectGlobals.buildPath + 'img'));
});


//build app index
gulp.task('buildAppIndex', function () {
// var jsonDatasToLoad = fs.readdirSync('./build/json');
 
 if( process.jsonDatasToLoad[0] === '.gitkeep')
    delete process.jsonDatasToLoad[0];
 console.log(process.jsonDatasToLoad);
  console.log('----');
 return es.concat(
    gulp.src('./src/partials/**/*.html')
      /*.pipe(minifyHTML({spare: true}))*/
      .pipe(partials())
      .pipe(concat('templates.html'))
      .pipe(gulp.dest(projectGlobals.buildPath))
  ).on("end", function() {
    var currentFile = "";

    gulp.src(['src/app_view/header.html',projectGlobals.buildPath + 'jsonData.html',projectGlobals.buildPath + 'templates.html','src/app_view/index.html','src/app_view/footer.html'])
        .pipe(tap(function (file,t) {
            currentFile = pathUtil.basename(file.path);
            console.log(currentFile);

        }))
        .pipe(gulpIf(function (){
            console.log('TEST ' + currentFile);
            console.log((currentFile === 'header.html' || currentFile === 'index.html' || currentFile === 'footer.html'));
            return (currentFile === 'header.html' || currentFile === 'index.html' || currentFile === 'footer.html')

        },
            template({
                scripts:["./js/vendor.min.js","./js/edWui.min.js"],
                css:["./css/vendor.min.css","./css/edWui.min.css"],
                jsonDatas:process.jsonDatasToLoad //fs.readdirSync('./build/json')
            })))
        .pipe(concat('index.html'))
        .pipe(minifyHTML({spare: true}))
        .pipe(gulp.dest('./build'));
  },'endclean');


});


//start a local webserver
gulp.task('connect', function() {
  connect.server({
    root: ['build'],
    port: 1337,
    livereload: true
  });
});