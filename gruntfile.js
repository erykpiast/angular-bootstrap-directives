module.exports = function (grunt) {

    grunt.registerTask('default', [ 'jshint', 'build', 'watch:src' ]);
    grunt.registerTask('build', [ 'clean', 'concat:all' ]);
    grunt.registerTask('release', [ 'build', 'uglify:release' ]);
    grunt.registerTask('test', [ 'karma:unit', 'watch:test' ]);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            dist: 'dist',
            src: {
                js: 'src/**/*.js'
            },
            spec: 'src/**/*.spec.js'
        },
        clean: ['<%= dist %>/*'],
        karma: {
            unit: {
                options: 'karma.conf.js'
            }
        },
        concat:{
            all: {
                src: '<%= config.src.js %>',
                dest: '<%= config.dist %>/<%= pkg.name %>.js'
            }
        },
        uglify: {
            release: {
                src: '<%= config.dist %>/<%= pkg.name %>.js',
                dest: '<%= config.dist %>/<%= pkg.name %>.js'
            }
        },
        watch:{
            src: {
                files: '<%= config.src.js %>',
                tasks: [ 'jshint', 'build' ]
            },
            test: {
                files: [ '<%= config.src.js %>', '<%= config.spec %>' ],
                tasks: [ 'build', 'test' ]
            }
        },
        jshint:{
            files: [
                'gruntfile.js',
                '<%= config.spec %>',
                '<%= config.src.js %>'
            ]
        }
    });

    require('load-grunt-tasks')(grunt);

};