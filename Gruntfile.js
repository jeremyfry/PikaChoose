'user strict';
module.exports = function(grunt){
	var LIVERELOAD_PORT = 35729;
	grunt.initConfig({
		connect: {
		  server: {
		    options: {
				port: 9000,
				base:'dist'
		    }
		  }
		},
		watch: {
			client: {
				files: ['src/**/*'],
				tasks:['traceur'],
				options: {
				  livereload:LIVERELOAD_PORT
				}
			}
		},
		traceur: {
			options: {

			},
			custom: {
				files:{
					'dist/pikachoose.js': ['src/**/*.js']
				}
			},
		}
	});
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-traceur');
	grunt.registerTask('preview', ['connect:server','watch:client']);
};