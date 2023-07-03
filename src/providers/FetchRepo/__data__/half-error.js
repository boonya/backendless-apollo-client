import RESPONSE from '../__response__/half-error.json';
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
	error: makeApolloError(RESPONSE.errors),
};
