import gulp from 'gulp';
import webp from 'gulp-webp';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import { isBuild } from '../../gulpfile.js';
import newer from 'gulp-newer';
const webpImageminPluginOptions = {
	quality: 100,
	alphaQuality: 100,
	lossless: 0

};
const images = () => {
	return gulp
		.src(filePaths.src.images)
		.pipe(plugins.handleError('IMAGES'))
		.pipe(newer(filePaths.build.images))
		.pipe(plugins.if(isBuild, webp(webpImageminPluginOptions)))
		.pipe(plugins.if(isBuild, gulp.dest(filePaths.build.images)))
		.pipe(
			imagemin([
				gifsicle({ interlaced: true }),
				mozjpeg({ quality: 100, progressive: true }),
				optipng({ optimizationLevel: 0 }),
				svgo({
					plugins: [
						{
							name: 'removeViewBox',
							active: true,
						},
						{
							name: 'cleanupIDs',
							active: false,
						},
					],
				}),
			]),
		)
		.pipe(newer(filePaths.build.images))
		.pipe(gulp.dest(filePaths.build.images))
		.pipe(gulp.src(filePaths.src.svg))
		.pipe(gulp.src(filePaths.src.ico))
		.pipe(gulp.dest(filePaths.build.images))
		.pipe(plugins.browserSync.stream());
};

export { images };
