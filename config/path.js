const path = require('path');

const configDir = path.resolve(__dirname);
const rootDir = path.resolve(configDir, '..');
const srcDir = path.resolve(rootDir, 'src');
const publicDir = path.resolve(rootDir, 'public');
const buildDir = path.resolve(rootDir, 'build');
const testDir = path.resolve(rootDir, 'test');
const storybookDir = path.resolve(rootDir, '.storybook');

module.exports = {
	buildDir,
	configDir,
	srcDir,
	htmlEntry: path.resolve(srcDir, 'index.html'),
	jsEntry: path.join(srcDir, 'index.js'),
	nodeModulesDir: path.resolve(rootDir, 'node_modules'),
	publicDir,
	rootDir,
	storybookDir,
	testDir,
};
