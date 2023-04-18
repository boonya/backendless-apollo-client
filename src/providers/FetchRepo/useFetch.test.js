import QUERY from './FetchRepo.gql';
import ERROR_RESULT from './__data__/error';
import HALF_ERROR_RESULT from './__data__/half-error';
import SUCCESSFUL_RESULT from './__data__/sample';
import ERROR_RESPONSE from './__response__/error.json';
import HALF_ERROR_RESPONSE from './__response__/half-error.json';
import SUCCESSFUL_RESPONSE from './__response__/sample.json';
import useFetch from './useFetch';
import {useQuery} from '@apollo/client';
import {makeApolloError} from '@test/helpers';
import {renderHook} from '@test/render';

// Here we mock a third party module
jest.mock('@apollo/client');

beforeEach(() => {
	// Here we mock a specific function from the module.
	useQuery.mockReturnValue({});
});

// The wrapper function to save our fingers and keyboard.
function render(...args) {
	return renderHook(() => useFetch(...args));
}

it('should execute proper query with proper variables.', () => {
	// Rendering the hook with specific parameters.
	render({name: 'backendless-apollo-client', owner: 'boonya'});

	expect(useQuery).toBeCalledTimes(1);
	// Expectation that useQuery executed single time
	// with a query object as a first argument and variables as a second one.
	expect(useQuery).toBeCalledWith(QUERY, {variables: {
		name: 'backendless-apollo-client',
		owner: 'boonya',
	}});
});

it('should execute proper query with additional options.', () => {
	render(
		{name: 'backendless-apollo-client', owner: 'boonya'},
		{additionalOption: 'the value of additional option'}
	);

	expect(useQuery).toBeCalledTimes(1);
	expect(useQuery).toBeCalledWith(QUERY, {
		variables: {
			name: 'backendless-apollo-client',
			owner: 'boonya',
		},
		additionalOption: 'the value of additional option',
	});
});

it('should give an initial result.', () => {
	useQuery.mockReturnValue({loading: false});

	const {result} = render();

	expect(result.current).toEqual({loading: false});
});

it('should give a result with a loading state.', () => {
	useQuery.mockReturnValue({loading: true});

	const {result} = render();

	expect(result.current).toEqual({loading: true});
});

it('should give a result with a data payload.', () => {
	// Mocking a result of useQuery
	useQuery.mockReturnValue({
		data: SUCCESSFUL_RESPONSE.data,
		loading: false,
	});

	const {result} = render();

	expect(result.current).toEqual({
		data: SUCCESSFUL_RESULT.data,
		loading: false,
	});
});

it('should give a result with an ApolloError.', () => {
	useQuery.mockReturnValue({
		error: makeApolloError(ERROR_RESPONSE.errors),
		loading: false,
	});

	const {result} = render();

	expect(result.current).toEqual({
		error: ERROR_RESULT.error,
		loading: false,
	});
});

it('should give a result with a data and an error at the same time.', () => {
	useQuery.mockReturnValue({
		data: HALF_ERROR_RESPONSE.data,
		error: makeApolloError(HALF_ERROR_RESPONSE.errors),
		loading: false,
	});

	const {result} = render();

	expect(result.current).toEqual({
		data: HALF_ERROR_RESULT.data,
		error: HALF_ERROR_RESULT.error,
		loading: false,
	});
});
