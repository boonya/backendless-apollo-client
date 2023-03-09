import {makeApolloError} from '@test/helpers';

export default {
	error: makeApolloError([{
		message: 'An error occurred.',
		name: 'Error',
		time_thrown: '2022-10-06T14:05:34.367Z',
		data: {
			error: 'ValidationError',
			code: 'GRAPHQL_VALIDATION_FAILED',
			message: 'Cannot query field "A" on type "B".',
		},
	}]),
};
