// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
	testEnvironment: 'jest-environment-jsdom',
	globals: {
		NODE_ENV: 'test',
	},
	globalSetup: './test/setup/global.js',
	setupFilesAfterEnv: ['./test/setup/index.js'],
	moduleDirectories: [
		'node_modules',
		'src',
	],
	// Automatically clear mock calls and instances between every test
	clearMocks: true,
	coverageDirectory: './coverage',
	// A list of reporter names that Jest uses when writing coverage reports
	coverageReporters: ['text-summary', 'html'],
	transformIgnorePatterns: [
		'/node_modules/',
		'\\.pnp\\.[^\\/]+$',
	],
	moduleNameMapper: {
		'\\.(?:gif|png|jpe?g|svg|woff2?|css)$': '<rootDir>/test/stubs/staticFile.js',
	},
	modulePathIgnorePatterns: [
		'<rootDir>/build/',
	],
};
