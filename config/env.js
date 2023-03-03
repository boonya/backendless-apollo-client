require('dotenv').config({path: '.env.local'});

const {
	NODE_ENV,
	APP_PREFIX,
	DEV_SERVER_PORT,
	GITHUB_API_URL,
	GITHUB_API_TOKEN,
} = process.env;

const value = (APP_PREFIX || '').replace(/^\/?(?<path>.*?)\/?$/u, '$1');
const basePath = value ? `/${value}/` : '/';

module.exports = {
	NODE_ENV,
	APP_PREFIX: basePath,
	DEV_SERVER_PORT,
	GITHUB_API_URL,
	GITHUB_API_TOKEN,
};
