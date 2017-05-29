var gulp = require('gulp'),
  initGulpTasks = require('react-component-gulp-tasks')
var taskConfig = {
  component: {
    name: 'ImageManager',
    dependencies: ['react', 'react-dom', 'react-images']
  },
  example: {
    src: 'src',
    dist: 'pier',
    files: [
      '.gitignore',
      '.npmignore',
      'favicon.ico',
      'index.html'
    ],
    scripts: [
      'app.js'
    ],
    less: [
      'app.less'
    ],
    port: "8010"
  }
}
initGulpTasks(gulp, taskConfig)
