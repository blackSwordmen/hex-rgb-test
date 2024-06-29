import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
// import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import webpCss from 'gulp-webpcss'; // Вывод WEBP изображений
import groupMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа запросов
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import cached from 'gulp-cached';
import remember from 'gulp-remember';
import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';
import { isBuild, isDev } from '../../gulpfile.js';
import newer from 'gulp-newer';
const sass = gulpSass(dartSass);

const scss = () => {
	const webpConfig = {
		webpClass: '.webp',
	};

	return (
		gulp
			.src(filePaths.src.scss, { sourcemaps: isDev })
			.pipe(plugins.handleError('SCSS'))

			.pipe(cached('scss')) 
			.pipe(sass({ outputStyle: 'expanded' }))
			.pipe(plugins.replace(/@img\//g, '../img/'))
			.pipe(plugins.replace(/@media\//g, '../media/'))
			.pipe(remember('scss')) 
			.pipe(plugins.if(isBuild, groupMediaQueries()))
			.pipe(plugins.if(isBuild, webpCss(webpConfig)))
			.pipe(plugins.if(isBuild, postcss([autoprefixer(), postcssPresetEnv()])))
			.pipe(rename({ extname: '.min.css' }))
			.pipe(gulp.dest(filePaths.build.css))
			.pipe(plugins.browserSync.stream())
	);
};

export { scss };