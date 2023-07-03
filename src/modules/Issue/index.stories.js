import Component from '.';
import ROUTES from '@src/ROUTES';

export default {
	component: Component,
	parameters: {
		router: {
			route: ROUTES.issue,
			params: {
				owner: 'owner-login',
				name: 'repo-name',
				number: '123,',
			},
		},
	},
};

export function Fullfilled(args) {
	return <Component {...args} />;
}
