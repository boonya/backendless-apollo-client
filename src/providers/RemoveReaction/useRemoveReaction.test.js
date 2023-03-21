import MUTATION from './RemoveReaction.gql';
import DATA_FORBIDDEN from './__data__/forbidden';
import DATA from './__data__/sample.json';
import RESPONSE_FORBIDDEN from './__response__/forbidden.json';
import RESPONSE from './__response__/sample.json';
import useRemoveReaction from './useRemoveReaction';
import {useMutation, useApolloClient} from '@apollo/client';
import {REACTION_CONTENT} from '@src/constants';
import {makeApolloError, makeQueryResult} from '@test/helpers';
import {renderHook} from '@test/render';

jest.mock('@apollo/client');

const mutation = jest.fn(async () => RESPONSE);
const evict = jest.fn().mockName('apollo.cache.evict');
const gc = jest.fn().mockName('apollo.cache.gc');

beforeEach(() => {
	useMutation.mockReturnValue([mutation, makeQueryResult()]);
	useApolloClient.mockReturnValue({cache: {evict, gc}});
});

function render(...args) {
	return renderHook(() => useRemoveReaction(...args));
}

it('should render hook.', () => {
	const {result} = render('options');

	expect(result.current).toEqual([expect.any(Function), {loading: false}]);

	expect(useMutation).toBeCalledWith(MUTATION, 'options');

	expect(mutation).not.toBeCalled();
	expect(evict).not.toBeCalled();
	expect(gc).not.toBeCalled();
});

it('should perform mutation.', async () => {
	const {result} = render();

	const data = await result.current[0]({issueId: 'issue-id', reaction: REACTION_CONTENT.heart});
	expect(data).toEqual(DATA.data);

	expect(mutation).toBeCalledTimes(1);
	expect(mutation).toBeCalledWith({variables: {
		subjectId: 'issue-id',
		content: REACTION_CONTENT.heart,
	}});

	expect(evict).toBeCalledTimes(1);
	expect(evict).toBeCalledWith({id: 'Issue:issue-id', fieldName: 'reactions'});

	expect(gc).toBeCalledTimes(1);
	expect(gc).toBeCalledWith();
});

describe('should rejects a promise', () => {
	it('if no arguments passed.', async () => {
		const {result} = render();

		expect(() => result.current[0]()).rejects
			.toThrow(/^Cannot read properties/u);

		expect(evict).not.toBeCalled();
		expect(gc).not.toBeCalled();
	});

	it('if mutation failed.', async () => {
		useMutation.mockReturnValue([async () => {
			throw makeApolloError(RESPONSE_FORBIDDEN.errors);
		}, makeQueryResult()]);

		const {result} = render();

		expect(() => result.current[0]({issueId: 'issue-id', reaction: REACTION_CONTENT.heart})).rejects
			.toThrow(DATA_FORBIDDEN.error);

		expect(evict).not.toBeCalled();
		expect(gc).not.toBeCalled();
	});
});

describe('should interpolate response onto result.', () => {
	it('initial state.', () => {
		useMutation.mockReturnValue([mutation, makeQueryResult()]);

		const {result} = render();

		expect(result.current[1]).toEqual({loading: false});
	});

	it('loading state.', () => {
		useMutation.mockReturnValue([mutation, makeQueryResult({loading: true})]);

		const {result} = render();

		expect(result.current[1]).toEqual({loading: true});
	});

	it('successful state.', () => {
		useMutation.mockReturnValue([mutation, makeQueryResult(RESPONSE)]);

		const {result} = render();

		expect(result.current[1]).toEqual({data: DATA.data, loading: false});
	});

	it('error state.', () => {
		useMutation.mockReturnValue([mutation, makeQueryResult(RESPONSE_FORBIDDEN)]);

		const {result} = render();

		expect(result.current[1]).toEqual({error: DATA_FORBIDDEN.error, loading: false});
	});
});
