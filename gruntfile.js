module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    simplemocha: {
      test: {
        options: {
          reporter: 'test'
        },
        src: "./tests/*_test.js"
      }
    },

    watch: {
      files: "./**/*.js",
      tasks: ['test']
    }
  });

  grunt.registerTask('test', 'simplemocha');
};