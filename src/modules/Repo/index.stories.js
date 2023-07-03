import Component from '.';
import ROUTES from '@src/ROUTES';

export default {
	component: Component,
	parameters: {
		// We know that the module is going to be rendered by specific route.
		router: {
			route: ROUTES.repo,
			params: {
				owner: 'owner-login',
				name: 'repo-name',
			},
		},
	},
};

// Here we render fullfilled module.
export function Fulfilled() {
	return <Component />;
}
