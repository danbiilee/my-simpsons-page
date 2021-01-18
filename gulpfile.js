const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const fileinclude = require('gulp-file-include'); 

gulp.task('sass', function(done){
    return gulp.src('app/scss/style.scss')
               .pipe(sass())
               .pipe(autoprefixer({grid:true}))
               .pipe(gulp.dest('dist/css'))
});

gulp.task('fileinclude', function(done){
    return gulp.src([
                    'app/index.html', 
                    'app/login.html',
                    'app/signup.html',
                    'app/thesimpsons.html',
                    'app/homer.html',
                    'app/marge.html',
                    'app/bart.html',
                    'app/lisa.html',
                    'app/maggie.html',
                    'app/video.html',
                    'app/game.html',
                    'app/roadmap.html',
                    'app/liked.html',
                    'app/showlist.html'
                ])
               .pipe(fileinclude({
                    prefix: '@@',
                    basepath: '@file'
                }))
                .pipe(gulp.dest('dist/'))
});

gulp.task('watch', function(){
    gulp.watch('app/scss/style.scss', gulp.series('sass'));
    gulp.watch([
            'app/index.html',
            'app/login.html',
            'app/signup.html',
            'app/thesimpsons.html',
            'app/homer.html',
            'app/marge.html',
            'app/bart.html',
            'app/lisa.html',
            'app/maggie.html',
            'app/video.html',
            'app/game.html',
            'app/roadmap.html',
            'app/liked.html',
            'app/showlist.html'
        ], gulp.series('fileinclude'));
});



