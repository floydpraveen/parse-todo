module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
     qunit: {
        all: {
          options: {
            timeout: 10000,
            urls: [
              'http://localhost:3333/js/tests/index.html',
            ]
          }
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
 // grunt.loadNpmTasks('grunt-contrib-uglify');
 grunt.loadNpmTasks('grunt-contrib-qunit');
 grunt.registerTask('default', ['qunit']);

  // Default task(s).
 // grunt.registerTask('default', ['uglify']);

};

