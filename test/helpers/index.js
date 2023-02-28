import {ApolloError} from '@apollo/client/errors';
import {ExtendableError} from '@src/utils/helpers';

class GraphQLError extends ExtendableError {
	constructor(cause) {
		super();
		this.name = 'Error';
		this.cause = cause.__typename;
		this.message = cause.message;
		this.data = cause;
		// eslint-disable-next-line babel/camelcase, camelcase
		this.time_thrown = new Date().toISOString();
	}
}

export function makeApolloError(errors) {
	const graphQLErrors = errors.map((cause) => new GraphQLError(cause));
	return new ApolloError({graphQLErrors});
}

export function makeQueryResult({data, errors, loading} = {}) {
	const error = Array.isArray(errors)
		? makeApolloError(errors)
		: undefined;

	return {
		data,
		loading: Boolean(loading),
		error,
	};
}
