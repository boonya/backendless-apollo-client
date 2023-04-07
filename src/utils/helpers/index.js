/**
 * The purpose of this utility class is to be like the normal Error class,
 * but change the name property to the name of the class by default.
 */
export class ExtendableError extends Error {
	constructor(...args) {
		super(...args);
		this.name = this.constructor.name;
	}
}

export function composeClassNames(array) {
	return array
		.filter((v) => typeof v === 'string' && v.trim())
		.join(' ');
}
