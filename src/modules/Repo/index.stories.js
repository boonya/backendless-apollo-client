import Component from '.';
import {query} from '@sb/msw';
import ROUTES from '@src/ROUTES';
import QUERY_FETCH_REPO from '@src/providers/FetchRepo/FetchRepo.gql';
import RESPONSE_FETCH_REPO from '@src/providers/FetchRepo/__response__/sample.json';

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
		// We know that the module relyes on specific queries.
		msw: {handlers: {
			fetchRepo: query(QUERY_FETCH_REPO, RESPONSE_FETCH_REPO),
		}},
	},
};

// Here we render fullfilled module.
export function Fulfilled() {
	return <Component />;
}

// Here we emulate slow query.
export function SlowQuery() {
	return <Component />;
}
SlowQuery.parameters = {msw: {handlers: {
	fetchRepo: query(QUERY_FETCH_REPO, RESPONSE_FETCH_REPO, {delay: 2000}),
}}};
