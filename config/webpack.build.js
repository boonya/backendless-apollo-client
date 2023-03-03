const {NODE_ENV} = require('./env');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');

module.exports = merge(common, {
	mode: NODE_ENV || 'production',
});
