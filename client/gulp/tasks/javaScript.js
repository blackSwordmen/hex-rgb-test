import gulp from 'gulp';
import webpack from 'webpack-stream';
import { webpackConfig } from '../../webpack.config.js';

import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import { isDev } from '../../gulpfile.js';
import newer from 'gulp-newer';
const javaScript = () => {
	return gulp
		.src(filePaths.src.js, { sourcemaps: isDev })
		.pipe(plugins.handleError('JS'))
		.pipe(newer(filePaths.build.js)) 
		.pipe(webpack({ config: webpackConfig(isDev) }))
		.pipe(gulp.dest(filePaths.build.js))
		.pipe(plugins.browserSync.stream());
};

export { javaScript };
