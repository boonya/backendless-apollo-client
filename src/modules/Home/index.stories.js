import Home from '.';
import {query} from '@sb/msw';
import QueryFetchLicenses from '@src/providers/FetchLicenses/FetchLicenses.gql';
import LICENSES_RESPONSE from '@src/providers/FetchLicenses/__response__/sample.json';
import QueryFetchMe from '@src/providers/FetchMe/FetchMe.gql';
import ME_RESPONSE_VALIDATION_ERROR from '@src/providers/FetchMe/__response__/ValidationError.json';
import ME_RESPONSE from '@src/providers/FetchMe/__response__/success.json';

export default {component: Home};

export function Fulfilled() {
	return <Home />;
}
Fulfilled.parameters = {msw: {handlers: {
	QueryFetchMe: query(QueryFetchMe, ME_RESPONSE),
	QueryFetchLicenses: query(QueryFetchLicenses, LICENSES_RESPONSE),
}}};

export function SlowQuery() {
	return <Home />;
}
SlowQuery.parameters = {msw: {handlers: {
	QueryFetchMe: query(QueryFetchMe, ME_RESPONSE, {delay: 1000}),
	QueryFetchLicenses: query(QueryFetchLicenses, LICENSES_RESPONSE, {delay: 2000}),
}}};

export function FailedQuery() {
	return <Home />;
}
FailedQuery.parameters = {msw: {handlers: [
	query(QueryFetchMe, ME_RESPONSE_VALIDATION_ERROR),
]}};
