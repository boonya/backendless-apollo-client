import QUERY from './FetchIssues.gql';
import DATA from './__data__/sample.json';
import RESPONSE from './__response__/sample.json';
import useFetch from './useFetch';
import {useQuery} from '@apollo/client';
import {makeQueryResult} from '@test/helpers';
import {renderHook} from '@test/render';

jest.mock('@apollo/client');

beforeEach(() => {
	useQuery.mockReturnValue({});
});

function render(...args) {
	return renderHook(() => useFetch(...args));
}

it('should render useQuery.', () => {
	render({name: 'backendless-apollo-client', owner: 'boonya'});

	expect(useQuery).toBeCalledTimes(1);
	expect(useQuery).toBeCalledWith(QUERY, {variables: {
		name: 'backendless-apollo-client',
		owner: 'boonya',
	}});
});

it('should render useQuery with additional options.', () => {
	render(
		{name: 'backendless-apollo-client', owner: 'boonya', first: 3},
		{option1: 'value1', option2: 'value2'}
	);

	expect(useQuery).toBeCalledTimes(1);
	expect(useQuery).toBeCalledWith(QUERY, {
		variables: {
			name: 'backendless-apollo-client',
			owner: 'boonya',
			first: 3,
		},
		option1: 'value1',
		option2: 'value2',
	});
});

it('initial', () => {
	useQuery.mockReturnValue(makeQueryResult());

	const {result} = render();

	expect(result.current).toEqual({loading: false});
});

it('loading', () => {
	useQuery.mockReturnValue(makeQueryResult({loading: true}));

	const {result} = render();

	expect(result.current).toEqual({loading: true});
});

it('successful', () => {
	useQuery.mockReturnValue(makeQueryResult(RESPONSE));

	const {result} = render();

	expect(result.current).toEqual({...DATA, loading: false});
});
