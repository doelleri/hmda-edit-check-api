'use strict';


module.exports = function compress(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-compress');

    return {
        'hmda-edit-check-api': {
            options: {
                archive: './dist/hmda-edit-check-api.zip',
                mode: 'zip',  //zip | gzip | deflate | tgz
                pretty: true
            },
            files: [
                {
                    expand: true,
                    cwd: './',

                    //zip all files except coverage, test dirs and the grunt/test modules
                    src: [ '**',
                        '!coverage/**',
                        '!test/**',
                        '!node_modules/grunt*/**',
                        '!node_modules/istanbul/**',
                        '!node_modules/mocha/**',
                        '!node_modules/supertest/**'
                    ]
                }
            ]
        }
    };

};