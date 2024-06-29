import gulp from 'gulp';
import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import newer from 'gulp-newer';
const copyRootFiles = () => {
	const config = {
		dot: true,
		allowEmpty: true,
	};
	const files = ['favicon1.ico', '.htaccess'];

	return gulp
		.src(plugins.concat(filePaths.srcFolder, files), config)
		.pipe(newer(filePaths.buildFolder))
		.pipe(gulp.dest(filePaths.buildFolder));
};

export { copyRootFiles };
