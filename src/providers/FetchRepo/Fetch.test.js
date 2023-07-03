import ContextProvider from './ContextProvider';
import FetchRepoProvider from './Fetch';
import ERROR_RESULT from './__data__/error';
import HALF_ERROR_RESULT from './__data__/half-error';
import SUCCESSFUL_RESULT from './__data__/sample';
import useFetch from './useFetch';
import {renderComponent} from '@test/render';

jest.mock('./ContextProvider');
jest.mock('./useFetch');

beforeEach(() => {
	useFetch.mockReturnValue({});
});

// To not repeat the same
function Component(props) {
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

it('should render underlying useFetch.', () => {
	renderComponent(<Component />);

	expect(useFetch).toBeCalledWith({name: 'backendless-apollo-client', owner: 'boonya'}, undefined);
});

it('should render useFetch with additional options.', () => {
	const options = {option1: 'value1', option2: 'value2'};
	renderComponent(<Component options={options} />);

	expect(useFetch).toBeCalledWith({name: 'backendless-apollo-client', owner: 'boonya'}, options);
});

it('should give an initial result.', () => {
	renderComponent(<Component />);

	expect(ContextProvider).toBeCalledWith({
		children: 'children',
		loading: false,
		data: undefined,
		error: undefined,
	}, {});
});

it('should give a result with a loading state.', () => {
	useFetch.mockReturnValue({loading: true});

	renderComponent(<Component />);

	expect(ContextProvider).toBeCalledTimes(1);
	expect(ContextProvider).toBeCalledWith({
		children: 'children',
		loading: true,
		data: undefined,
		error: undefined,
	}, {});
});

it('should give a result with a data payload.', () => {
	useFetch.mockReturnValue(SUCCESSFUL_RESULT);

	renderComponent(<Component />);

	expect(ContextProvider).toBeCalledTimes(1);
	expect(ContextProvider).toBeCalledWith({
		children: 'children',
		loading: false,
		data: SUCCESSFUL_RESULT.data,
		error: undefined,
	}, {});
});

it('should give a result with an ApolloError.', () => {
	useFetch.mockReturnValue(ERROR_RESULT);

	renderComponent(<Component />);

	expect(ContextProvider).toBeCalledTimes(1);
	expect(ContextProvider).toBeCalledWith({
		children: 'children',
		loading: false,
		data: undefined,
		error: ERROR_RESULT.error,
	}, {});
});

it('should give a result with a data and an error at the same time.', () => {
	useFetch.mockReturnValue(HALF_ERROR_RESULT);

	renderComponent(<Component />);

	expect(ContextProvider).toBeCalledTimes(1);
	expect(ContextProvider).toBeCalledWith({
		children: 'children',
		loading: false,
		data: HALF_ERROR_RESULT.data,
		error: HALF_ERROR_RESULT.error,
	}, {});
});
