import {makeApolloError} from '@test/helpers';

export default {
	data: {
		id: 'R_kgDOJDgP4w',
		name: 'backendless-apollo-client',
		url: 'https://github.com/boonya/backendless-apollo-client',
		homepageUrl: 'https://boonya.github.io/backendless-apollo-client/',
		description: 'How to do a Frontend Ahead of Backend demo project',
		descriptionHTML: '<div>How to do a Frontend Ahead of Backend demo project</div>',
		createdAt: new Date('2023-02-28T12:15:22Z'),
		licenseInfo: {
			id: 'MDc6TGljZW5zZTEz',
			name: 'MIT License',
			url: 'http://choosealicense.com/licenses/mit/',
		},
		owner: {
			id: 'MDQ6VXNlcjc3OTE4NA==',
			login: 'boonya',
			avatarUrl: 'https://avatars.githubusercontent.com/u/779184?v=4',
		},
	},
	error: makeApolloError([{
		message: 'You must provide a `first` or `last` value to properly paginate the `languages` connection.',
		name: 'Error',
		time_thrown: '2022-10-06T14:05:34.367Z',
		data: {
			error: 'ValidationError',
			code: 'GRAPHQL_VALIDATION_FAILED',
			message: 'You must provide a `first` or `last` value to properly paginate the `languages` connection.',
		},
	}]),
};
