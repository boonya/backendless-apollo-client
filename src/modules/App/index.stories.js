import App from '.';
import {expect} from '@storybook/jest';
import {within} from '@storybook/testing-library';
import {query} from '@sb/msw';
import QueryFetchMe from '@src/providers/Me/FetchMe.gql';
import ME_RESPONSE_VALIDATION_ERROR from '@src/providers/Me/__response__/ValidationError.json';
import ME_RESPONSE from '@src/providers/Me/__response__/success.json';

export default {component: App};

export function Fulfilled() {
	return <App />;
}
Fulfilled.parameters = {msw: {handlers: [
	query(QueryFetchMe, ME_RESPONSE),
]}};
Fulfilled.play = async ({canvasElement}) => {
	const screen = within(canvasElement);

	await screen.findByText('Hello, Dude Dudovich!');

	const link = screen.getByRole('link', {name: /Welcome to the GitHub GraphQL API/u});
	await expect(link).toHaveAttribute('href', 'https://studio.apollographql.com/public/github/home?variant=current');
	await expect(link).toHaveAttribute('target', '_blank');
};

export function SlowQuery() {
	return <App />;
}
SlowQuery.parameters = {msw: {handlers: [
	query(QueryFetchMe, ME_RESPONSE, {delay: 3000}),
]}};
Fulfilled.play = async ({canvasElement}) => {
	const screen = within(canvasElement);

	screen.getByRole('progressbar', {name: 'Please wait'});

	const link = screen.getByRole('link', {name: /Welcome to the GitHub GraphQL API/u});
	await expect(link).toHaveAttribute('href', 'https://studio.apollographql.com/public/github/home?variant=current');
	await expect(link).toHaveAttribute('target', '_blank');
};

export function FailedQuery() {
	return <App />;
}
FailedQuery.parameters = {msw: {handlers: [
	query(QueryFetchMe, ME_RESPONSE_VALIDATION_ERROR),
]}};
