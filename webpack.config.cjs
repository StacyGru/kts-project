const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
	return [isProd ? MiniCssExtractPlugin.loader : 'style-loader',
		!withModules ? 'css-loader' : {
			loader: 'css-loader',
			options: {
				modules: {
					localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]'
				}
			}
		}, {
			loader: 'postcss-loader',
			options: {
				postcssOptions: {
					plugins: ['autoprefixer']
				}
			}
		}, 'sass-loader']
}

module.exports = {
	entry: path.join(srcPath, 'index.tsx'),
	target: !isProd ? 'web' : 'browserslist',
	devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
	output: {
		path: buildPath,
		filename: "bundle.js"
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
		alias: {
			components: path.join(srcPath, 'components'),
			config: path.join(srcPath, 'config'),
			styles: path.join(srcPath, 'styles'),
			utils: path.join(srcPath, 'utils'),
			assets: path.join(srcPath, 'assets'),
			pages: path.resolve(srcPath, 'App/pages'),
			store: path.join(srcPath, 'store'),
			models: path.join(srcPath, 'store/models'),
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(srcPath, 'index.html')
		}),
		!isProd && new ReactRefreshWebpackPlugin(),
		isProd && new MiniCssExtractPlugin({
			filename: '[name]-[hash].css'
		}),
		new TsCheckerPlugin()
	].filter(Boolean),
	module: {
		rules: [
			{
				test: /\.module\.s?css$/,
				use: getSettingsForStyles(true),
			},
			{
				test: /\.s?css$/,
				exclude: /\.module\.s?css$/,
				use: getSettingsForStyles()
			},
			{
				test: /\.[tj]sx?$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.(png|svg|jpg)$/,
				type: "asset",
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024
					}
				}
			}
		],
	},
	devServer: {
		host: '127.0.0.1',
		port: 9000,
		hot: true,
		historyApiFallback: true,
		client: {
			overlay: false
		}
	}
}