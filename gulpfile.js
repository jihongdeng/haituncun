let gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	htmlmin = require("gulp-htmlmin"),
	sass = require("gulp-sass"),
	babel = require("gulp-babel"),
	connect = require("gulp-connect");

gulp.task("connect", function(){
	connect.server({
		root : "dist",
		livereload : true,
		port : 8080
	});
});

gulp.task("html", function(){
	gulp.src("src/**/*.html")
		.pipe(htmlmin({collapseWhitespace: true, minifyCSS: true, minifyJS:true}))
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
})

gulp.task("js", function(){
	gulp.src("src/js/*.js")
		.pipe(babel({
			presets : ["es2015"]
		}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
});

gulp.task("lib", function(){
	gulp.src(["src/lib/**/*.*"])
		.pipe(gulp.dest("dist/lib"));
});
gulp.task("images", function(){
	gulp.src(["src/images/**/*.*"])
		.pipe(gulp.dest("dist/images"));
});
gulp.task("mock", function(){
	gulp.src(["src/mock/**/*.*"])
		.pipe(gulp.dest("dist/mock"));
});
gulp.task("copy", ["lib", "images", "mock"]);

gulp.task("sass", function(){
	gulp.src("src/sass/*.scss")
		.pipe(sass({outputStyle:"compressed"}))
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
});

gulp.task("watch", function(){
	gulp.watch("src/**/*.scss", ["sass"]);
	gulp.watch("src/**/*.js", ["js"]);
	gulp.watch("src/**/*.html", ["html"]);
});

gulp.task("default", ["connect", "copy", "html", "js", "sass", "watch"]);