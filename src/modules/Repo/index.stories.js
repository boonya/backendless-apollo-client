import Repo from '.';
import {query} from '@sb/msw';
import QueryFetchRepo from '@src/providers/FetchRepo/FetchRepo.gql';
import REPO_RESPONSE from '@src/providers/FetchRepo/__response__/sample.json';

export default {component: Repo};

export function Fulfilled() {
	return <Repo />;
}
Fulfilled.parameters = {msw: {handlers: {
	QueryFetchRepo: query(QueryFetchRepo, REPO_RESPONSE),
}}};

export function SlowQuery() {
	return <Repo />;
}
SlowQuery.parameters = {msw: {handlers: {
	QueryFetchRepo: query(QueryFetchRepo, REPO_RESPONSE, {delay: 1000}),
}}};
