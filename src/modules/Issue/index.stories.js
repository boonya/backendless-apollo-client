import Component from '.';
import {query} from '@sb/msw';
import ROUTES from '@src/ROUTES';
import QUERY_FETCH_ISSUE from '@src/providers/FetchIssue/FetchIssue.gql';
import RESPONSE_FETCH_ISSUE from '@src/providers/FetchIssue/__response__/sample.json';

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
		msw: {handlers: {
			fetchIssue: query(QUERY_FETCH_ISSUE, RESPONSE_FETCH_ISSUE),
		}},
	},
};

export function Fullfilled(args) {
	return <Component {...args} />;
}

export function SlowQuery(args) {
	return <Component {...args} />;
}
SlowQuery.parameters = {msw: {handlers: {
	fetchIssue: query(QUERY_FETCH_ISSUE, RESPONSE_FETCH_ISSUE, {delay: 2000}),
}}};
