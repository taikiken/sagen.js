var path = require('path');
var _ = require('lodash');

module.exports = function(grunt) {
    "use strict";

    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig( {
        pkg: grunt.file.readJSON('package.json'),

        // Default values
        name: 'MITI',
        docsZip: "<%= pkg.name %>_docs-<%= version %>.zip",

        // Setup doc names / paths.
        docsName: '<%= pkg.name %>_docs-<%= version %>',
        docsFolder: "../_output/<%= docsName %>/",

        // Setup Uglify for JS minification.
        uglify: {
            options: {
                banner: grunt.file.read('LICENSE'),
                preserveComments: "some",
                compress: {
                    global_defs: {
                        "DEBUG": false
                    }
                }
            },
            build: {
                files: {
                    '../_output/<%= pkg.name.toLowerCase() %>-<%= version %>.min.js': getConfigValue('source')
                }
            }
        },

        concat: {
            options: {
                separator: ''
            },
            build: {
                files: {
                    '../_output/<%= pkg.name.toLowerCase() %>-<%= version %>.js': getCombinedSource()
                }
            }
        },

        // Build docs using yuidoc
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                version: '<%= version %>',
                description: '<%= pkg.description %>',
                url: '<%= pkg.url %>',
                logo: '<%= pkg.logo %>',
                options: {
                    paths: ['../src/'],
                    outdir: '<%= docsFolder %>',
                    linkNatives: true,
                    attributesEmit: true,
                    selleck: true,
                    helpers: ["./path.js"]
                }
            }
        },

        compress: {
            build: {
                options: {
                    mode:'zip',
                    archive:'../_output/<%= docsZip %>'
                },
                files: [
                    {expand:true, src:'**', cwd:'<%= docsFolder %>'}
                ]
            }
        },

        copy: {
            docsZip: {
                files: [
                    {expand: true, cwd:'../_output/', src:'<%= docsZip %>', dest:'../docs/'}
                ]
            },
            docsSite: {
                files: [
                    {expand:true, cwd:'<%= docsFolder %>', src:'**', dest:getConfigValue('docs_out_path')}
                ]
            },
            src: {
                files: [
                    {expand: true, cwd:'../_output/', src: '*.js', dest: '../libs/'}
                ]
            }
        },

        updateversion: {
            sagen: {
                file: '../src/version.js',
                version: '<%= version %>'
            }
        }
    } );

    function getBuildConfig() {
        // Read the global settings file first.
        var config = grunt.file.readJSON('config.json');

        // If we have a config.local.json .. prefer its values.
        if (grunt.file.exists('config.local.json')) {
            var config2 = grunt.file.readJSON('config.local.json');
            _.extend(config, config2);
        }

        return config;
    }

    function getConfigValue(name) {
        var config = grunt.config.get('buildConfig');

        if (config==null) {
            config = getBuildConfig();
            grunt.config.set('buildConfig', config);
        }

        return config[name];
    }

    function getCombinedSource() {
        var configs = [
            {cwd: '', config:'config.json', source:'source'}
        ];

        return combineSource(configs);
    }

    function combineSource(configs) {
        // Pull out all the source paths.
        var sourcePaths = [];
        for (var i=0;i<configs.length;i++) {
            var o = configs[i];
            var json = grunt.file.readJSON(path.resolve(o.cwd, o.config));
            var sources = json[o.source];
            sources.forEach(function(item, index, array) {
                array[index] = path.resolve(o.cwd, item);
            });
            sourcePaths = sourcePaths.concat(sources);
        }

        // Remove duplicates (Like EventDispatcher)
        var dups = {};
        var clean = [];
        for (i=0;i<sourcePaths.length;i++) {
            var src = sourcePaths[i];
            var cleanSrc = src.substr(src.lastIndexOf('src' + path.sep));
            if  (dups[cleanSrc] == null) {
                clean.push(src);
                dups[cleanSrc] = true;
            }
        }

        return clean;
    }

    // ===========================================
    // Load all the tasks we need
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadTasks('../_build_tools/tasks/');

    /**
     * Build the docs using YUIdocs.
     */
    grunt.registerTask('docs', [
        "yuidoc", "compress", "copy:docsZip"
    ]);

    /**
     * Sets out version to the version in package.json (defaults to NEXT)
     */
    grunt.registerTask('setVersion', function () {
        grunt.config.set('version', grunt.config.get('pkg').version);
    });

    /**
     * Task for exporting a release build (version based on package.json)
     *
     */
    grunt.registerTask('build', [
        "setVersion", "combine", "coreBuild", "copy:docsSite"
    ]);

    /**
     * Main build task, always runs after next or build.
     *
     */
    grunt.registerTask('coreBuild', [
        "updateversion", "uglify", "docs", "copy:src"
    ]);


    /**
     * Task for exporting combined view.
     *
     */
    grunt.registerTask('combine', 'Combine all source into a single, un-minified file.', [
        "concat"
    ]);

    /**
     * Task for exporting combined view.
     *
     */
    grunt.registerTask('test', 'Combine all source into a single, minified file.', [
        "setVersion", "combine", "uglify", "copy:src"
    ]);
};