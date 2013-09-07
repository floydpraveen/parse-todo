
module.exports = function(grunt) {
  grunt.initConfig({
    exec: {
      jasmine: {
        command: 'phantomjs tests/lib/phantomjs_jasmine_runner.js tests/index.html tests/',
        stdout: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['exec']);

}
