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
	useQuery.mockReturnValue({});

	const {result} = render();

	expect(result.current).toEqual({loading: false});
});

it('loading', () => {
	useQuery.mockReturnValue({loading: true});

	const {result} = render();

	expect(result.current).toEqual({loading: true});
});

it('successful', () => {
	useQuery.mockReturnValue(makeQueryResult(SUCCESSFUL_RESPONSE));

	const {result} = render();

	expect(result.current).toEqual({...SUCCESSFUL_RESULT, loading: false});
});

it('ValidationError', () => {
	useQuery.mockReturnValue(makeQueryResult(VALIDATION_ERROR_RESPONSE));

	const {result} = render();

	expect(result.current).toEqual({...VALIDATION_ERROR_RESULT, loading: false});
});
