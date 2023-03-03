const {NODE_ENV, APP_PREFIX, GITHUB_API_URL, GITHUB_API_TOKEN} = require('./env');
const {
	htmlEntry,
	jsEntry,
	publicDir,
	nodeModulesDir,
	buildDir,
} = require('./path');
const {description} = require('../package.json');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const optimization = {
	minimize: true,
	minimizer: [
		new HtmlMinimizerPlugin(),
	],
};

module.exports = {
	mode: NODE_ENV,
	resolveLoader: {
		modules: [nodeModulesDir],
	},
	entry: [jsEntry],
	output: {
		path: buildDir,
		filename: 'static/js/[name].[chunkhash:8].js',
		chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
		clean: true,
	},
	optimization: NODE_ENV === 'production' ? optimization : undefined,
	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV),
			APP_PREFIX: JSON.stringify(APP_PREFIX),
			GITHUB_API_URL: JSON.stringify(GITHUB_API_URL),
			GITHUB_API_TOKEN: JSON.stringify(GITHUB_API_TOKEN),
		}),
		new CopyPlugin({patterns: [{
			from: publicDir,
			to: buildDir,
		}]}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: htmlEntry,
			xhtml: true,
			base: APP_PREFIX,
			title: description,
			templateParameters: {APP_PREFIX},
		}),
	],
	module: {
		rules: [
			{
				test: /\.(?:js|mjs)$/u,
				exclude: /node_modules/u,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/u,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(?:graphql|gql)$/u,
				include: /src/u,
				loader: 'graphql-tag/loader',
			},
		],
	},
};
