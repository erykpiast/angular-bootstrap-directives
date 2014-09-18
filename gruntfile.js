module.exports = function(grunt) {

    grunt.registerTask('default', ['jshint', 'build', 'watch:src']);
    grunt.registerTask('build', ['clean:dist', 'ngtemplates:angular-bootstrap-directives', 'concat:all']);
    grunt.registerTask('release', ['build', 'uglify:release']);
    grunt.registerTask('test', ['build', 'karma:unit', 'watch:test']);
    grunt.registerTask('demo', ['jshint', 'build', 'http-server:demo', 'watch:src']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            demo: {
                dir: 'demo',
                files: 'demo/**'
            },
            dist: {
                dir: 'dist',
                html: 'dist/templates.js',
                js: 'dist/<%= pkg.name %>.js'
            },
            src: {
                js: ['src/**/*.js', '!src/**/*.spec.js'],
                html: ['src/**/*.html']
            },
            spec: 'src/**/*.spec.js'
        },
        clean: {
            dist: ['<%= config.dist %>/*']
        },
        karma: {
            unit: {
                options: {
                    configFile: 'test/karma.conf.js'
                }
            }
        },
        concat: {
            all: {
                options: {
                    process: function(src, filepath) {
                        var filename = /\/([^\/]+$)/.exec(filepath)[1];

                        return [
                            '// ### ' + filename + ' >>',
                            src,
                            '// ### << ' + filename,
                            '\n'
                        ].join('\n\n');
                    }
                },
                src: ['<%= config.src.js %>', '<%= config.dist.html %>'],
                dest: '<%= config.dist.js %>'
            }
        },
        ngtemplates: {
            'angular-bootstrap-directives': {
                src: '<%= config.src.html %>',
                dest: '<%= config.dist.html %>'
            }
        },
        uglify: {
            release: {
                src: '<%= config.dist %>/<%= pkg.name %>.js',
                dest: '<%= config.dist %>/<%= pkg.name %>.js'
            }
        },
        watch: {
            demo: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= config.src.js.files %>',
                    '<%= config.demo.files %>'
                ],
                tasks: ['jshint', 'build']
            },
            src: {
                files: ['<%= config.src.js %>', '<%= config.src.html %>'],
                tasks: ['jshint', 'build']
            },
            test: {
                files: ['<%= config.src.js %>', '<%= config.spec %>'],
                tasks: ['build', 'test']
            }
        },
        'http-server': {
            demo: {
                root: '.',
                port: 8080,
                host: '127.0.0.1',
                cache: -1,
                showDir: true,
                autoIndex: true,
                defaultExt: 'html',
                runInBackground: true
            }
        },
        jshint: {
            files: [
                'gruntfile.js',
                '<%= config.spec %>',
                '<%= config.src.js %>'
            ]
        }
    });

    require('load-grunt-tasks')(grunt);

};
