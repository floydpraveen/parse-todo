
module.exports = function(grunt) {
  grunt.initConfig({
    // connect: {
    //   test: {
    //     port: 8000,
    //     middleware: function(connect) {
    //       return [
    //         mountFolder(connect, 'app')
    //       ];
    //     }
    //   }
    // },

    // watch: {
    //   files: ['jasmine/spec/**/*.js', 'app/**/*.js'],
    //   tasks: 'exec'
    // },

    exec: {
      jasmine: {
        command: 'phantomjs jasmine/lib/run-jasmine.js jasmine/index.html',
        stdout: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-exec');
 // grunt.loadNpmTasks('grunt-contrib-connect');
 // grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['exec']);

}