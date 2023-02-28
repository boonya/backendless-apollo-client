import {action} from '@storybook/addon-actions';
import {graphql} from 'msw';

function createMswCallback(_response, options, operation) {
	const delay = options?.delay || 300;
	const statusCode = options?.statusCode || 200;

	return async (req, res, ctx) => {
		const response = typeof _response === 'function'
			? _response(req)
			: _response;

		action(`[MSW Request] ${operation}`)({
			body: req.body,
			variables: req.variables,
		});

		const result = await res(
			ctx.delay(delay),
			ctx.status(statusCode),
			response?.data && ctx.data(response?.data),
			response?.errors && ctx.errors(response?.errors),
		);

		action(`[MSW Response] ${operation} (${result.status} ${result.statusText})`)({
			body: JSON.parse(result.body),
			status: result.status,
			statusText: result.statusText,
		});

		return result;
	};
}

export function extractOperationName(operation) {
	return operation.definitions[0].name.value;
}

export function query(operation, response, options) {
	const name = typeof operation === 'string'
		? operation
		: extractOperationName(operation);
	return graphql.query(name, createMswCallback(response, options, `query ${name}`));
}

export function mutation(operation, response, options) {
	const name = typeof operation === 'string'
		? operation
		: extractOperationName(operation);
	return graphql.mutation(name, createMswCallback(response, options, `mutation ${name}`));
}
