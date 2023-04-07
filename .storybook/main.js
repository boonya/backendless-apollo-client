const {NODE_ENV, APP_PREFIX} = require('../config/env');
const webpackConfig = require('../config/webpack.common');
const webpack = require('webpack');

const loadersToExclude = [
	/\.css$/u,
	/\.svg$/u,
].map((item) => item.toString());

const appRules = webpackConfig.module.rules.filter(({test}) => !loadersToExclude.includes(test.toString()));

module.exports = {
	stories: ['../src/**/*.stories.js'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-a11y',
	],
	staticDirs: [{
		from: '../public/',
		to: '/',
	}, {
		from: './public/',
		to: '/',
	}],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	webpackFinal: ({module, ...config}) => {
		return {
			...config,
			mode: NODE_ENV || config.mode,
			plugins: [
				...config.plugins,
				new webpack.DefinePlugin({
					NODE_ENV: JSON.stringify(NODE_ENV),
					APP_PREFIX: JSON.stringify(APP_PREFIX),
					API_URL: '<undefined>',
					API_TOKEN: '<undefined>',
				}),
			],
			module: {
				...module,
				rules: [
					...module.rules,
					...appRules,
				],
			},
		};
	},
};
