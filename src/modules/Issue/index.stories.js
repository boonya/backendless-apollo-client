import Component from '.';
import {query, mutation} from '@sb/msw';
import ROUTES from '@src/ROUTES';
import MUTATION_ADD_REACTION from '@src/providers/AddReaction/AddReaction.gql';
import RESPONSE_ADD_REACTION from '@src/providers/AddReaction/__response__/sample.json';
import QUERY_FETCH_ISSUE from '@src/providers/FetchIssue/FetchIssue.gql';
import RESPONSE_FETCH_ISSUE from '@src/providers/FetchIssue/__response__/sample.json';
import MUTATION_REMOVE_REACTION from '@src/providers/RemoveReaction/RemoveReaction.gql';
import RESPONSE_REMOVE_REACTION from '@src/providers/RemoveReaction/__response__/sample.json';

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
			addReaction: mutation(MUTATION_ADD_REACTION, RESPONSE_ADD_REACTION),
			removeReaction: mutation(MUTATION_REMOVE_REACTION, RESPONSE_REMOVE_REACTION),
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
	addReaction: mutation(MUTATION_ADD_REACTION, RESPONSE_ADD_REACTION, {delay: 2000}),
	removeReaction: mutation(MUTATION_REMOVE_REACTION, RESPONSE_REMOVE_REACTION, {delay: 2000}),
}}};
