import gulp from 'gulp';
import del from 'del';
import zipPlugin from 'gulp-zip';

import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';
import newer from 'gulp-newer';
const zip = () => {
	del(`./${filePaths.projectDirName}.zip`);

	return gulp
		.src(`${filePaths.buildFolder}/**/*.*`, {})
		.pipe(plugins.handleError('ZIP'))
		.pipe(
			newer('./', {
				ext: '.zip',
			}),
		)
		.pipe(zipPlugin(`${filePaths.projectDirName}.zip`))
		.pipe(gulp.dest('./'));
};

export { zip };