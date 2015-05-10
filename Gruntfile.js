'use strict';
module.exports = function(grunt){
	var LIVERELOAD_PORT = 35729;

	grunt.initConfig({
		connect: {
		  server: {
		    options: {
				port: 9000,
				base:'demo'
		    }
		  }
		},
		watch: {
			client: {
				files: ['src/**/*'],
				tasks:['babel', 'less', 'replace'],
				options: {
				  livereload:LIVERELOAD_PORT
				}
			}
		},
		babel: {
			options: {
				blacklist: ['strict']
			},
			default: {
				files:{
					'tmp/pikachoose.js': 'src/pikachoose.js'
				}
			},
		},
		replace: {
			default: {
				src: ['src/pikachoose.html'],
				dest: 'demo/',
				replacements: [{
					from: 'scriptReplacement',
					to:  function(){
						return grunt.file.read('tmp/pikachoose.js')
					}
				},
				{
					from: '(styleReplacement);', // it's ugly so syntax highlighting still works
					to:  function(){
						return grunt.file.read('tmp/pikachoose.css')
					}
				}]
			}
		},
		less: {
			default: {
				files: {
					"tmp/pikachoose.css": "src/pikachoose.less"
				}
			},
		}
	});
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-text-replace')
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.registerTask('default', ['connect:server','watch:client']);
};