import Component from '.';
import {userEvent, within} from '@storybook/testing-library';
import {query} from '@sb/msw';
import ROUTES from '@src/ROUTES';
import QUERY_FETCH_ISSUES from '@src/providers/FetchIssues/FetchIssues.gql';
import RESPONSE_FETCH_ISSUES from '@src/providers/FetchIssues/__response__/sample.json';
import QUERY_FETCH_REPO from '@src/providers/FetchRepo/FetchRepo.gql';
import RESPONSE_FETCH_REPO from '@src/providers/FetchRepo/__response__/sample.json';

export default {
	component: Component,
	parameters: {
		router: {
			route: ROUTES.repo,
			params: {
				owner: 'owner-login',
				name: 'repo-name',
			},
		},
		msw: {handlers: {
			fetchRepo: query(QUERY_FETCH_REPO, RESPONSE_FETCH_REPO),
			fetchIssues: query(QUERY_FETCH_ISSUES, RESPONSE_FETCH_ISSUES),
		}},
	},
};

export function Fulfilled() {
	return <Component />;
}

export function SlowQuery() {
	return <Component />;
}
SlowQuery.parameters = {msw: {handlers: {
	fetchRepo: query(QUERY_FETCH_REPO, RESPONSE_FETCH_REPO, {delay: 2000}),
	fetchIssues: query(QUERY_FETCH_ISSUES, RESPONSE_FETCH_ISSUES, {delay: 2000}),
}}};

export function IssuesShown() {
	return <Component />;
}
IssuesShown.play = async ({canvasElement}) => {
	const canvas = within(canvasElement);

	const button = await canvas.findByRole('button', {name: 'Want to see issues?'});
	userEvent.click(button);

	await canvas.findByRole('list', {name: 'Issues list'});
};
