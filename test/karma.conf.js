module.exports = function (config) {
    config.set({
        basePath: '../',

        frameworks: [ 'jasmine' ],

        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-animate/angular-animate.js',
            'dist/angular-bootstrap-directives.js',
            'src/**/*.spec.js',
            'src/**/*.html'
        ],

        preprocessors: {
            'src/**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            moduleName: 'templates'
        },

        reporters: [ 'dots' ],
        colors: true,
        logLevel: config.LOG_INFO,
        
        port: 9876,
        autoWatch: false,

        browsers: [ 'PhantomJS' ],
        singleRun: true
    });
};