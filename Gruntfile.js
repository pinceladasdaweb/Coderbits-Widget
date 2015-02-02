module.exports = function (grunt) {
    "use strict";

    var pkg = grunt.file.readJSON("package.json");

    grunt.initConfig({
        meta: {
            banner: '/*! '+pkg.name+' '+pkg.version+' | (c) 2015 '+pkg.author+' | '+pkg.licenses[0].type+' License */'
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>\n'
            },
            target: {
                files: {
                    'build/coderbits.min.js': ['lib/coderbits.js']
                }
            }
        },
        watch: {
            js: {
                files: ['lib/coderbits.js'],
                tasks: ['uglify'],
                options: {
                    livereload: true,
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [ 'uglify' ]);
};
