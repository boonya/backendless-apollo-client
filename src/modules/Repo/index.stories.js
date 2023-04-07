import Repo from '.';
import {expect} from '@storybook/jest';
import {userEvent, within} from '@storybook/testing-library';
import {query} from '@sb/msw';
import ROUTES from '@src/ROUTES';
import QueryFetchIssues from '@src/providers/FetchIssues/FetchIssues.gql';
import ISSUES_RESPONSE from '@src/providers/FetchIssues/__response__/sample.json';
import QueryFetchRepo from '@src/providers/FetchRepo/FetchRepo.gql';
import REPO_RESPONSE from '@src/providers/FetchRepo/__response__/sample.json';

export default {
	component: Repo,
	parameters: {
		router: {route: ROUTES.repo, params: {name: 'repo-name', owner: 'owner-login'}},
		msw: {handlers: {
			QueryFetchRepo: query(QueryFetchRepo, REPO_RESPONSE),
			QueryFetchIssues: query(QueryFetchIssues, ISSUES_RESPONSE),
		}},
	},
};

export function Fulfilled() {
	return <Repo />;
}

export function SlowQuery() {
	return <Repo />;
}
SlowQuery.parameters = {msw: {handlers: {
	QueryFetchRepo: query(QueryFetchRepo, REPO_RESPONSE, {delay: 2000}),
	QueryFetchIssues: query(QueryFetchIssues, ISSUES_RESPONSE, {delay: 2000}),
}}};

export function IssuesShown() {
	return <Repo />;
}
IssuesShown.play = async ({canvasElement}) => {
	const canvas = within(canvasElement);

	const button = await canvas.findByRole('button', {name: 'Want to see issues?'});
	userEvent.click(button);

	await canvas.findByRole('list', {name: 'Issues list'});
};
