// Comment out if you want to use Fieldbook
var fbdownload = require('fieldbook-download');
var CONF = require('./app/js/conf.js');
var fs = require('fs');

module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: {
            before : ['dist/*', '.tmp/'],
            after : ['dist/css/scss', 'dist/js/*', '!dist/js/dist.js', 'dist/lib']
        },

        sass: {
            options : {
                style : 'compressed'
            },

            dist : {
                files : {
                    'app/css/style.css' : 'app/css/scss/style.scss'
                }
            }
        },

        autoprefixer : {
            dist : {
                files : {
                    'app/css/style.css' : 'app/css/style.css'
                }
            }
        },

        watch : {
            css : {
                files : 'app/css/scss/*.scss',
                tasks : ['style']
            }
        },

        copy: {
            all: {
                files: [
                    {
                        expand: true,
                        cwd : 'app',
                        src: '**',
                        dest: 'dist'
                    }
                ]
            }
        },

        useminPrepare: {
            html: ['app/index.html'],
            options: {
                dest: 'dist'
            }
        },

        usemin: {
            html : ['dist/index.html']
        },

        asset_cachebuster : {
            options : {
                buster : Date.now()
            },
            build : {
                files : {
                    'dist/index.html' : ['dist/index.html']
                }
            }
        }
    });

    grunt.registerTask('fieldbookDownload', 'Download all fieldbook assets', function() {
        fbdownload({
            bookId : CONF.bookId,
            csvPath : './app/data/',
            dataPath : './app/data/data.json',
            mediaPath : './app/media/',
            skipExistingFiles : true,
            callback : this.async()
        });
    });

    grunt.registerTask(
        'addProductionLibraries',
        'Replace a couple of development libraries with production values',
        function() {
            var files = grunt.config.get('concat.generated.files');

            files[0].src = files[0].src.map((src) => {
                // Currently the only thing we replace is Vue.js
                if (src.indexOf('vue/dist/vue.js') !== -1) {
                    src = src.replace('vue.js', 'vue.min.js');
                }

                return src;
            });

            grunt.config.set('concat.generated.files', files);
        }
    );

    grunt.registerTask('build', [
        'fieldbookDownload',
        'clean:before',
        'copy:all',
        'sass',
        'autoprefixer',
        'useminPrepare',
        'addProductionLibraries',
        'concat',
        'uglify',
        'usemin',
        'asset_cachebuster',
        'clean:after'
    ]);

    grunt.registerTask('style', [
        'sass',
        'autoprefixer'
    ]);

    grunt.registerTask("cleanupTemplate", "Remove all non-useful stuff from the default template", function() {
        fs.unlinkSync('./app/js/app.js');
        console.log("Don't forget to add an ID to the conf.js!");
    });

    grunt.registerTask('default', ['build']);
};