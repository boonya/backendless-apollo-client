import Repo from '.';
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
	},
};

export function Fulfilled() {
	return <Repo />;
}
Fulfilled.parameters = {msw: {handlers: {
	QueryFetchRepo: query(QueryFetchRepo, REPO_RESPONSE),
	QueryFetchIssues: query(QueryFetchIssues, ISSUES_RESPONSE),
}}};

export function SlowQuery() {
	return <Repo />;
}
SlowQuery.parameters = {msw: {handlers: {
	QueryFetchRepo: query(QueryFetchRepo, REPO_RESPONSE, {delay: 2000}),
	QueryFetchIssues: query(QueryFetchIssues, ISSUES_RESPONSE, {delay: 2000}),
}}};
