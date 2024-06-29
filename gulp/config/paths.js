import path from 'path';

const projectDirName = path.basename(path.resolve());
const buildFolder = `./web`;
const srcFolder = `./src`;

const filePaths = {
	build: {
		product: `${buildFolder}/product/`,
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		images: `${buildFolder}/img/`,
		media: `${buildFolder}/media/`,
		fonts: `${buildFolder}/fonts/`,
	},
	src: {
		js: `${srcFolder}/js/*.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,

		svg: `${srcFolder}/img/**/*.svg`,
		ico: `${srcFolder}/img/**/*.ico`,
		scss: `${srcFolder}/scss/**/*.scss`,

		html: `${srcFolder}/*.html`,

		svgIcons: `${srcFolder}/img/svgSprite/**/*.svg`,
	},
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`,
		images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	projectDirName,
	ftp: ``,
};

export { filePaths };
