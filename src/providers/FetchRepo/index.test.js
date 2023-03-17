import FetchRepoProvider from '.';
import ContextProvider from './ContextProvider';
import ERROR_RESULT from './__data__/error';
import HALF_ERROR_RESULT from './__data__/half-error';
import SUCCESSFUL_RESULT from './__data__/sample';
import useFetch from './useFetch';
import {renderComponent} from '@test/render';

jest.mock('./ContextProvider');
jest.mock('./useFetch');

beforeEach(() => {
	useFetch.mockReturnValue({});
	ContextProvider.mockReturnValue(null);
});

function DataProvider(props) {
	return (
		<FetchRepoProvider
			name="backendless-apollo-client"
			owner="boonya"
			{...props}
		>
			children
		</FetchRepoProvider>
	);
}

describe('should interpolate response on to the context.', () => {
	it('initially', () => {
		renderComponent(<DataProvider />);

		expect(ContextProvider).toBeCalledTimes(1);
		expect(ContextProvider).toBeCalledWith({
			children: 'children',
			loading: false,
			data: undefined,
			error: undefined,
		}, {});
	});

	it('loading', () => {
		useFetch.mockReturnValue({loading: true});

		renderComponent(<DataProvider />);

		expect(ContextProvider).toBeCalledTimes(1);
		expect(ContextProvider).toBeCalledWith({
			children: 'children',
			loading: true,
			data: undefined,
			error: undefined,
		}, {});
	});

	it('data', () => {
		useFetch.mockReturnValue(SUCCESSFUL_RESULT);

		renderComponent(<DataProvider />);

		expect(ContextProvider).toBeCalledTimes(1);
		expect(ContextProvider).toBeCalledWith({
			children: 'children',
			loading: false,
			data: SUCCESSFUL_RESULT.data,
			error: undefined,
		}, {});
	});

	it('error', () => {
		useFetch.mockReturnValue(ERROR_RESULT);

		renderComponent(<DataProvider />);

		expect(ContextProvider).toBeCalledTimes(1);
		expect(ContextProvider).toBeCalledWith({
			children: 'children',
			loading: false,
			data: undefined,
			error: ERROR_RESULT.error,
		}, {});
	});

	it('half error', () => {
		useFetch.mockReturnValue(HALF_ERROR_RESULT);

		renderComponent(<DataProvider />);

		expect(ContextProvider).toBeCalledTimes(1);
		expect(ContextProvider).toBeCalledWith({
			children: 'children',
			loading: false,
			data: HALF_ERROR_RESULT.data,
			error: HALF_ERROR_RESULT.error,
		}, {});
	});
});

it('should render useFetch without options property.', () => {
	renderComponent(<DataProvider />);

	expect(useFetch).toBeCalledWith({name: 'backendless-apollo-client', owner: 'boonya'}, undefined);
});

it('should render useFetch with options property.', () => {
	const options = {option1: 'value1', option2: 'value2'};
	renderComponent(<DataProvider options={options} />);

	expect(useFetch).toBeCalledWith({name: 'backendless-apollo-client', owner: 'boonya'}, options);
});
