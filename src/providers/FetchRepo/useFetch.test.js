import QUERY from './FetchRepo.gql';
import ERROR_RESULT from './__data__/error';
import HALF_ERROR_RESULT from './__data__/half-error';
import SUCCESSFUL_RESULT from './__data__/sample';
import ERROR_RESPONSE from './__response__/error.json';
import HALF_ERROR_RESPONSE from './__response__/half-error.json';
import SUCCESSFUL_RESPONSE from './__response__/sample.json';
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
		{name: 'backendless-apollo-client', owner: 'boonya', languages: 2},
		{option1: 'value1', option2: 'value2'}
	);

	expect(useQuery).toBeCalledTimes(1);
	expect(useQuery).toBeCalledWith(QUERY, {
		variables: {
			name: 'backendless-apollo-client',
			owner: 'boonya',
			languages: 2,
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
	useQuery.mockReturnValue(makeQueryResult(SUCCESSFUL_RESPONSE));

	const {result} = render();

	expect(result.current).toEqual({data: SUCCESSFUL_RESULT.data, loading: false});
});

it('error', () => {
	useQuery.mockReturnValue(makeQueryResult(ERROR_RESPONSE));

	const {result} = render();

	expect(result.current).toEqual({error: ERROR_RESULT.error, loading: false});
});

it('half error', () => {
	useQuery.mockReturnValue(makeQueryResult(HALF_ERROR_RESPONSE));

	const {result} = render();

	expect(result.current).toEqual({data: HALF_ERROR_RESULT.data, error: HALF_ERROR_RESULT.error, loading: false});
});
