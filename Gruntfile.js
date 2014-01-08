
module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-env');

  grunt.initConfig({
    filesAll: [
      'test/**/*.test.js',
      'routes/**/*.js',
      'index.js' ,
      'Gruntfile.js'
    ],
    filesTest: [
      'test/**/*.test.js'
    ],
    filesGrunt: ['Gruntfile.js'],

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'should',
          growl: true
        },
        src: ['<%= filesTest %>']
      }
    },

    /**
     * Supports setting NODE_ENV to make supertest less chatty
     * @type {Object}
     */
    env : {
      mocha : {
        NODE_ENV : 'test',
        LOGLEVEL: 'error'
      }
    },

    /**
     * delta (renamed 'watch' command)
     *
     * default action is 'test'
     *
     * test - will watch all files and run jshint and all mocha tests on changes
     *  > grunt delta:test
     *
     * lint - will watch all files and jshint just the file that changed on save
     *  > grunt delta:lint
     */
    delta: {
      lint: {
        files: '<%= filesAll %>',
        tasks: ['jshint:all']
      },
      test: {
        files: '<%= filesAll %>',
        tasks: ['jshint:all', 'env:mocha', 'mochaTest:test']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: '<%= filesAll %>',
      test: '<%= filesTest %>',
      changedfile: []
    }


  });

  grunt.renameTask('watch', 'delta');
  grunt.registerTask('watch', ['delta:test']);
  grunt.registerTask('test', ['jshint:all', 'env:mocha', 'mochaTest:test']);

};
