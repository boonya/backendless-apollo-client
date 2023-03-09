import VALIDATION_ERROR_RESULT from './__data__/ValidationError';
import SUCCESSFUL_RESULT from './__data__/success';
import VALIDATION_ERROR_RESPONSE from './__response__/ValidationError.json';
import SUCCESSFUL_RESPONSE from './__response__/success.json';
import useFetch from './useFetch';
import {useQuery} from '@apollo/client';
import {makeQueryResult} from '@test/helpers';
import {renderHook} from '@test/render';

jest.mock('@apollo/client');

function render() {
	return renderHook(() => useFetch());
}

it('initial', () => {
	useQuery.mockReturnValue(makeQueryResult({}));

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

	expect(result.current.data).toEqual(SUCCESSFUL_RESULT.data);
	expect(result.current.loading).toBe(false);
});

it('ValidationError', () => {
	useQuery.mockReturnValue(makeQueryResult(VALIDATION_ERROR_RESPONSE));

	const {result} = render();

	expect(result.current.error).toEqual(VALIDATION_ERROR_RESULT.error);
	expect(result.current.loading).toBe(false);
});
