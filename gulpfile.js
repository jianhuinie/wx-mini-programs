const gulp          = require('gulp');
const del           = require('del');
const watch         = require('gulp-watch');
const rename        = require('gulp-rename');
const base64        = require('gulp-base64');
const less          = require('gulp-less');
const runSequence   = require('run-sequence');
const notify        = require('gulp-notify');
const plumber       = require('gulp-plumber');

require('./gulp/server');

const srcFolder  = {
	wxml: './src/**/*.wxml',
	less: './src/**/*.less',
	js: './src/**/*.js',
	wxs: './src/**/*.wxs',
	json: './src/**/*.json',
	fonts: './src/**/*.{eot,svg,ttf,woff}',
	images: './src/**/*.{png,jpg,jpeg,svg}',
};

const dist = './dist/';

// 清除dist目录
gulp.task('clean',function() {
	del([
		'dist/**/*'
	]);
});

// 编译所有文件
gulp.task('build', function () {
	runSequence('clean', function () {
		// clean之后再copy  不然会报文件找不到需要重新运行
		setTimeout(function () {
			// copyWxml();
			// compileLess();
			// copyJs();
			// copyWxs();
			// copyJson();
			// copyFonts();
			// copyImages();
			Object.keys(srcFolder).forEach((item) => {
				if (item !== 'less') {
					copyFileToDist(srcFolder[item]);
				} else {
					compileLess();
				}
			});
		}, 100);
	});
});

// 开发模式监听文件变化
gulp.task('dev', function () {
	gulp.start('wxml', 'less', 'js', 'wxs', 'json', 'fonts', 'images');
});

// 启本地mock服务 && 文件监听
gulp.task('server', function () {
	gulp.start('server:start', 'dev');
});


// 监听wxml改动copy到dist对应目录
gulp.task('wxml', function () {
	watch([srcFolder.wxml], function () {
		// copyWxml();
		copyFileToDist(srcFolder.wxml);
	});
});

// 监听less改动做预处理并copy到dist对应目录
gulp.task('less', function () {
	watch([srcFolder.less], function () {
		compileLess();
	});
});

// 监听js改动copy到dist对应目录
gulp.task('js', function () {
	watch([srcFolder.js], function () {
		// copyJs();
		copyFileToDist(srcFolder.js);
	});
});

// 监听wxs改动copy到dist对应目录
gulp.task('wxs', function () {
	watch([srcFolder.wxs], function () {
		// copyWxs();
		copyFileToDist(srcFolder.wxs);
	});
});

// 监听json改动copy到dist对应目录
gulp.task('json', function () {
	watch([srcFolder.json], function () {
		// copyJson();
		copyFileToDist(srcFolder.json);
	});
});

// 监听fonts改动copy到dist对应目录
gulp.task('fonts', function () {
	watch([srcFolder.fonts], function () {
		// copyFonts();
		copyFileToDist(srcFolder.fonts);
	});
});

// 监听images改动copy到dist对应目录
gulp.task('images', function () {
	watch([srcFolder.images], function () {
		// copyImages();
		copyFileToDist(srcFolder.images);
	});
});

// 预处理less
function compileLess() {
	return gulp.src(srcFolder.less)
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(less())
		.pipe(base64({
			extensions: ['png', /\.jpg#datauri$/i],
			maxImageSize: 10 * 1024
		}))
		.pipe(rename({
			extname: ".wxss"
		}))
		.pipe(gulp.dest(dist));
}


// // 复制wxml
// function copyWxml() {
// 	gulp.src(srcFolder.wxml)
// 		.pipe(gulp.dest(dist));
// }

// // 复制js
// function copyJs() {
// 	gulp.src(srcFolder.js)
// 		.pipe(gulp.dest(dist));
// }

// // 复制wxs
// function copyWxs() {
// 	gulp.src(srcFolder.wxs)
// 		.pipe(gulp.dest(dist));
// }

// // 复制json
// function copyJson() {
// 	gulp.src(srcFolder.json)
// 		.pipe(gulp.dest(dist));
// }

// // 复制fonts
// function copyFonts() {
// 	gulp.src(srcFolder.fonts)
// 		.pipe(gulp.dest(dist));
// }

// // 复制images
// function copyImages() {
// 	gulp.src(srcFolder.images)
// 		.pipe(gulp.dest(dist));
// }

// 拷贝文件到dist目录
function copyFileToDist(filePaths) {
	gulp.src(filePaths)
		.pipe(gulp.dest(dist));
}
