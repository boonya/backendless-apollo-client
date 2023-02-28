import DataProvider from '.';
import ContextProvider from './ContextProvider';
import VALIDATION_ERROR_RESULT from './__data__/ValidationError';
import SUCCESSFUL_RESULT from './__data__/success';
import VALIDATION_ERROR_RESPONSE from './__response__/ValidationError.json';
import SUCCESSFUL_RESPONSE from './__response__/success.json';
import {useQuery} from '@apollo/client';
import {makeQueryResult} from '@test/helpers';
import {renderComponent} from '@test/render';

jest.mock('@apollo/client');
jest.mock('./ContextProvider');

beforeEach(() => {
	ContextProvider.mockReturnValue(null);
});

function render() {
	return renderComponent(<DataProvider>children</DataProvider>);
}

it('components should have an appropriate displayName value.', () => {
	expect(DataProvider.displayName).toBe('Me.DataProvider');
	expect(ContextProvider.displayName).toBe('Me.ContextProvider');
});

describe('should interpolate response on to the context', () => {
	it('initially', () => {
		useQuery.mockReturnValue({});

		render();

		expect(ContextProvider).toBeCalledTimes(1);
		expect(ContextProvider).toBeCalledWith({
			children: 'children',
			loading: false,
			data: undefined,
			error: undefined,
		}, {});
	});

	it('loading', () => {
		useQuery.mockReturnValue({loading: true});

		render();

		expect(ContextProvider).toBeCalledTimes(1);
		expect(ContextProvider).toBeCalledWith({
			children: 'children',
			loading: true,
			data: undefined,
			error: undefined,
		}, {});
	});

	it('data', () => {
		useQuery.mockReturnValue(makeQueryResult(SUCCESSFUL_RESPONSE));

		render();

		expect(ContextProvider).toBeCalledTimes(1);
		expect(ContextProvider).toBeCalledWith({
			children: 'children',
			loading: false,
			data: SUCCESSFUL_RESULT.data,
			error: undefined,
		}, {});
	});

	it('error', () => {
		useQuery.mockReturnValue(makeQueryResult(VALIDATION_ERROR_RESPONSE));

		render();

		expect(ContextProvider).toBeCalledTimes(1);
		expect(ContextProvider).toBeCalledWith({
			children: 'children',
			loading: false,
			data: undefined,
			error: VALIDATION_ERROR_RESULT.error,
		}, {});
	});
});
