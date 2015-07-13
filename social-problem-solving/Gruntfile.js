module.exports = function(grunt) {

  grunt.initConfig({

    project: grunt.file.readJSON('package.json'),

    /** * Static HTTP Server
     * Serves files from ./static directory.
     * Do not use in Production!
     */
    connect: {
      server: {
        options: { port: '3000', base: 'static' }
      }
    },

    /**
     * Watches for changes in files then
     * recompiles them and starts a livereload.
     */
    watch: {

      // with browserify
      scripts: {
        files: ['app/scripts/**/*.js*'],
        tasks: ['browserify:dev', 'targethtml:dev']
      },

      // with scss
      styles: {
        files: ['app/styles/**/*.scss'],
        tasks: ['sass:dev', 'targethtml:dev']
      },

      // concatenate vendor files
      vendor: {
        files: ['bower_components/**/*'],
        tasks: ['bower_concat'],
      },

      // reload browser
      static: {
        files: ['static/**/*.html', 'static/**/*.js', 'static/**/*.css'],
        options: {
          livereload: true
        }
      }

    },

    /**
     * Concatenates all vendor files
     */
    bower_concat: {
      all: {
        dest: 'static/assets/js/vendor.js',
        cssDest: 'static/assets/css/vendor.css',
        exclude: [
          'jquery',
          'modernizr',
          'fastclick',
          'jquery.cookie',
          'jquery-placeholder',
          'fastclick'
        ],
        mainFiles: {
          'foundation-essentials': 'css/foundation.css'
        }
      }
    },

    /**
     * Compile SCSS files into CSS
     */
    sass: {
      dev: {
        files: {
          'static/assets/css/social-problem-solver.css': 'app/styles/main.scss'
        },
        options: {
          sourcemap: 'auto'
        }
      },
      dist: {
        files: {
          'static/assets/css/social-problem-solver.min.css': 'app/styles/main.scss'
        },
        options: {
          style: 'compressed',
          sourcemap: 'none'
        }
      }
    },

    /**
     * Turn Node style modules into
     * browser ready code.
     */
    browserify: {
      dev: {
        files: {
          'static/assets/js/social-problem-solver.js': 'app/scripts/index.js'
        },
        options: {
          transform: ['babelify'],
          browserifyOptions: {
            debug: true
          }
        },
      },
      dist: {
        files: {
          'static/assets/js/social-problem-solver.min.js': 'app/scripts/index.js'
        },
        options: {
          transform: ['babelify', 'browserify-ngannotate', 'uglifyify']
        }
      }
    },

    /**
     * Minify vendor js code
     */
    uglify: {
      dist: {
        files: {
          'static/assets/js/vendor.min.js': 'static/assets/js/vendor.js'
        }
      }
    },

    /**
     * Minify vendor js code
     */
    cssmin: {
      dist: {
        files: {
          'static/assets/css/vendor.min.css': 'static/assets/css/vendor.css'
        }
      }
    },

    /**
     * Process index.html to add script tags
     * for dev and dist builds.
     */
    targethtml: {
      dev: {
        files: {
          'static/index.html': 'app/views/index.html'
        }
      },
      dist: {
        files: {
          'static/index.html': 'app/views/index.html'
        }
      }
    },

    /**
     * Lint JS
     */
    jshint: {
      all: ['app/scripts/**/*.js*'],
      options: {
        jshintrc: true
      }
    },

    /**
     * JS Code Style
     */
    jscs: {
      src: 'app/scripts/**/*.js*',
      options: {
        config: '.jscsrc'
      }
    },

    /**
     * Lint SCSS
     */
    scsslint: {
      allFiles: ['app/styles/**/*.scss'],
      options: {
        colorizeOutput: true,
        config: '.scss-lint.yml'
      }
    },

    /**
     * Clean the build directory
     */
    clean: {
      dev: [
        'static/assets/js/*',
        'static/assets/css/*'
      ],
      dist: [
        'static/assets/js/*.min.js',
        'static/assets/css/*.min.css'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-notify');

  grunt.registerTask('dev', ['browserify:dev', 'sass:dev', 'targethtml:dev']);
  grunt.registerTask('dist', ['browserify:dist', 'sass:dist', 'targethtml:dist', 'bower_concat', 'uglify', 'cssmin']);
  grunt.registerTask('lint', ['jshint', 'jscs', 'scsslint']);
  grunt.registerTask('serve', ['connect']);
  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('default', ['connect', 'watch']);
};
