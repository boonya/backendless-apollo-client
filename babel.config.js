const presets = [
	'@babel/preset-env',
	['@babel/preset-react', {runtime: 'automatic'}],
];

const plugins = [
	'@babel/plugin-transform-runtime',
	[
		'babel-plugin-module-resolver', {
			root: ['./'],
			alias: {
				'@public': './public',
				'@sb': './.storybook',
				'@src': './src',
				'@test': './test',
			},
		},
	],
];

module.exports = {
	presets,
	plugins,
};
