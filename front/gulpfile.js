const { series, src, dest } = require('gulp')

function copyViews() {
    return src('src/views/**/*')
    .pipe(dest('dist/views'))
}

function copyPublic() {
    return src('src/public/**/*')
    .pipe(dest('dist/public'))
}

function copyBower_components() {
    return src('bower_components/bootstrap/**/*')
    .pipe(dest('dist/public/bower_components/bootstrap'))
}

exports.default = series(
    copyViews, copyPublic, copyBower_components
)