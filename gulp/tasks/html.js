import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import webpHtml from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import htmlMin from 'gulp-htmlmin';
import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import { isBuild } from '../../gulpfile.js';
import newer from 'gulp-newer';
import replace from 'gulp-replace';
// расскомменитровать, если нужно будет когда-либо делать реплейс в ссылках . НЕ УДАЛЯТЬ!
// const fixHtmlLinks = () => {
// 	return gulp
// 		.src([`${filePaths.build.product}/**/*.html`])
// 		.pipe(replace(/(href|src)="(?!http|\/)(?!\.{0,2}\/)(.*?)"/g, '$1="$2"'))
// 		.pipe(gulp.dest(filePaths.build.product))
// 		.on('end', () => {
// 			console.log('fixHtmlLinks task completed');
// 		});
// };
const html = () => {
	return gulp
		.src(filePaths.src.html)
		.pipe(plugins.handleError('HTML'))
		.pipe(fileInclude())
		.pipe(plugins.replace(/@img\//g, 'img/'))
		.pipe(plugins.replace(/@media\//g, 'media/'))
		.pipe(plugins.if(isBuild, webpHtml()))
		.pipe(
			htmlMin({
				useShortDoctype: true,
				sortClassName: true,
				removeComments: isBuild,
			}),
		)
		.pipe(
			plugins.if(
				isBuild,
				versionNumber({
					value: '%DT%',
					append: {
						key: '_v',
						cover: 0,
						to: ['css', 'js'],
					},
					output: {
						file: 'gulp/version.json',
					},
				}),
			),
		)
		.pipe(newer(filePaths.build.html)) // Используем gulp-newer
		.pipe(gulp.dest(filePaths.build.html))
		.pipe(plugins.browserSync.stream());
};
export {
	html,
};
