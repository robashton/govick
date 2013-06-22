module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      test: {
        command: 'mocha'
      }
    }
  })
  grunt.loadNpmTasks('grunt-exec')
  grunt.registerTask('test', ['exec:test'])
}
