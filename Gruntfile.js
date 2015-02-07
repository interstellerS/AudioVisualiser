var path  = require('path') ; 
var rewrite = require('connect-modrewrite');
var basePath = path.join(__dirname, "src/server") ;

// Load Grunt tasks declared in the package.json file

module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
     jshint: {
      all: [
        "karma.conf.js",
        "Gruntfile.js",
        "src/**/*.js",
        "specs/**/*.js"
      ],
      options: {
        jshintrc: ".jshintrc"
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['specs/server/test-server.js']
      }
    },
    connect: {
      server: {
        options: {
          debug : true ,
          keepalive: true,
          hostname:'localhost',
          port: 9000,
          base: '',
           // http://danburzo.ro/grunt/chapters/server/
          middleware: function(connect, options) {

            var middleware = [];

            // 1. mod-rewrite behavior
            var rules = [
                '!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /specs/client/index.html'
            ];
            middleware.push(rewrite(rules));

            // 2. original middleware behavior
            var base = options.base;
            if (!Array.isArray(base)) {
                base = [base];
            }
            base.forEach(function(path) {
                middleware.push(connect.static(path));
            });

            return middleware;

          }
        }
      }
    },
    express: {
      all: {
        options: {
           port : 3000 ,
           livereload: true,
           server: path.resolve(basePath, 'server.js')
        }
      }
    },
    watch: {
      all: {
        // Replace with whatever file you want to trigger the update from
        // Either as a String for a single entry 
        // or an Array of String for multiple entries
        // You can use globing patterns like `css/**/*.css`
        // See https://github.com/gruntjs/grunt-contrib-watch#files
        files: ['src/server/views/*.jade', 'public/styles/*.css'],
        options: {
          livereload: true
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:3000/audioVisualizer'
      },
      test: {
        path: 'http://localhost:3000/testSvg'
      }
    }
  });


  grunt.registerTask("testServer", ["jshint" , "mochaTest"]);
  grunt.registerTask('testClient', ['express','open:test','watch']);
  grunt.registerTask('server', ['express','open:server','watch']);

};