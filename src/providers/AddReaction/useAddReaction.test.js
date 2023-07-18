import MUTATION from './AddReaction.gql';
import DATA from './__data__/sample.json';
import RESPONSE from './__response__/sample.json';
import useAddReaction from './useAddReaction';
import {useMutation, useApolloClient} from '@apollo/client';
import {REACTION_CONTENT} from '@src/constants';
import {makeQueryResult} from '@test/helpers';
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
	return renderHook(() => useAddReaction(...args));
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
