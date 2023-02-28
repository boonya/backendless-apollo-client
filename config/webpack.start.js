const {DEV_SERVER_PORT} = require('./env');
const {buildDir} = require('./path');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		static: buildDir,
		compress: true,
		port: DEV_SERVER_PORT,
		historyApiFallback: {
			rewrites: [
				{from: /./u, to: '/index.html'},
			],
		},
		hot: true,
		client: {
			progress: true,
		},
	},
});
