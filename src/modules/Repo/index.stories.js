import Repo from '.';
// import {userEvent, within} from '@storybook/testing-library';
import {within} from '@storybook/testing-library';
import {query} from '@sb/msw';
import ROUTES from '@src/ROUTES';
import FETCH_ISSUES_QUERY from '@src/providers/FetchIssues/FetchIssues.gql';
import ISSUES_RESPONSE from '@src/providers/FetchIssues/__response__/sample.json';
import FETCH_REPO_QUERY from '@src/providers/FetchRepo/FetchRepo.gql';
import REPO_RESPONSE from '@src/providers/FetchRepo/__response__/sample.json';

export default {
	component: Repo,
	parameters: {
		router: {route: ROUTES.repo, params: {name: 'repo-name', owner: 'owner-login'}},
		msw: {handlers: {
			FETCH_REPO_QUERY: query(FETCH_REPO_QUERY, REPO_RESPONSE),
			FETCH_ISSUES_QUERY: query(FETCH_ISSUES_QUERY, ISSUES_RESPONSE),
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
	FETCH_REPO_QUERY: query(FETCH_REPO_QUERY, REPO_RESPONSE, {delay: 2000}),
	FETCH_ISSUES_QUERY: query(FETCH_ISSUES_QUERY, ISSUES_RESPONSE, {delay: 2000}),
}}};

export function IssuesShown() {
	return <Repo />;
}
IssuesShown.play = async ({canvasElement}) => {
	const canvas = within(canvasElement);

	await canvas.findByRole('button', {name: 'Want to see issues?'});
	// const button = await canvas.findByRole('button', {name: 'Want to see issues?'});
	// userEvent.click(button);

	await canvas.findByRole('list', {name: 'Issues list'});
};
