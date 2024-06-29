import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import path from 'path';
import { fileURLToPath } from 'url';
import TerserPlugin from 'terser-webpack-plugin';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import  webpack  from 'webpack';
const paths = {
	src: path.resolve(__dirname, 'src'),
	build: path.resolve(__dirname, 'web'),
};

export const webpackConfig = (isMode) => {
	return {
		entry: {
			app: path.join(paths.src, 'js/app.js'),
			
		},
		plugins: [
			new BundleAnalyzerPlugin({
				analyzerMode: isMode ? 'server' : 'disabled',
				openAnalyzer: false,
				analyzerPort: 'auto',
			}),
			new webpack.ids.HashedModuleIdsPlugin({
				context: __dirname,
				hashFunction: 'sha256',
				hashDigest: 'hex',
				hashDigestLength: 20,
			}),
		],
		mode: isMode ? 'development' : 'production',
		output: {
			path: path.join(paths.build, 'js'),
			filename: '[name].min.js',
			publicPath: '/',
		},
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
					resolve: {
						fullySpecified: false,
					},
				},
			],
		},
		optimization: {
			minimize: true,
			moduleIds: 'deterministic',
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						keep_classnames: true,
						keep_fnames: true,
						mangle: false, 
					},
				}),
			],
		},
	};
};

export default webpackConfig;
