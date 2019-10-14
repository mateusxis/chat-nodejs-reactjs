const {
  task: gulpTask,
  series: gulpSeries,
  src: gulpSource,
  dest: gulpDest,
  watch: gulpWatch
} = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const swagger = require('gulp-swagger');

gulpTask('lint', function() {
  return gulpSource(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulpTask('nodemon-dist', function() {
  return nodemon({
    exec: 'node --inspect',
    script: 'dist/bin/server.js',
    watch: ['src/**/**/*'],
    tasks: ['build'],
    delay: 2000,
    inspect: true,
  });
});

gulpTask('build', function() {
  return gulpSource(['src/**/*.js', 'src/**/*.json'], { base: 'src' })
    .pipe(gulpDest('dist/'));
});

gulpTask('nodemon-src', function() {
  return nodemon({
    exec: 'node --inspect',
    script: 'src/bin/server.js',
    watch: ['src/**/**/*'],
    tasks: ['lint'],
    delay: 2000,
  });
});

gulpTask('swagger', function(done) {
  gulpSource('src/api/index.yaml')
    .pipe(swagger('api.json'))
    .pipe(gulpDest('./src'), done());
});

gulpTask('watch', function() {
  return gulpWatch(['src/**/*.js'], gulpSeries(['lint']));
});

gulpTask('default', gulpSeries(['lint', 'nodemon-src']));

gulpTask('debug-dist', gulpSeries(['lint', 'build', 'nodemon-dist']));

gulpTask('deploy', gulpSeries(['lint', 'swagger', 'build']));
