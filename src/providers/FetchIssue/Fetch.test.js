import ContextProvider from './ContextProvider';
import FetchIssueProvider from './Fetch';
import RESULT from './__data__/sample';
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
		<FetchIssueProvider
			name="backendless-apollo-client"
			owner="boonya"
			number={9}
			{...props}
		>
			children
		</FetchIssueProvider>
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
		useFetch.mockReturnValue(RESULT);

		renderComponent(<DataProvider />);

		expect(ContextProvider).toBeCalledTimes(1);
		expect(ContextProvider).toBeCalledWith({
			children: 'children',
			loading: false,
			data: RESULT.data,
			error: undefined,
		}, {});
	});
});

it('should render useFetch without options property.', () => {
	renderComponent(<DataProvider />);

	expect(useFetch).toBeCalledWith({name: 'backendless-apollo-client', owner: 'boonya', number: 9}, undefined);
});

it('should render useFetch with options property.', () => {
	const options = {option1: 'value1', option2: 'value2'};
	renderComponent(<DataProvider options={options} />);

	expect(useFetch).toBeCalledWith({name: 'backendless-apollo-client', owner: 'boonya', number: 9}, options);
});
