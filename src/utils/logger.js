const logFunction = (method) => (...args) => (...details) => {
	// eslint-disable-next-line no-console
	console[method](...args, ...details);
};

export const logInfo = logFunction('info');
export const logWarn = logFunction('warn');
export const logError = logFunction('error');
