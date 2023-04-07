import RepoDetails from '.';
import {screen, within} from '@testing-library/react';
import {useFetchRepoContext} from '@src/providers/FetchRepo/ContextProvider';
import ERROR from '@src/providers/FetchRepo/__data__/error';
import DATA from '@src/providers/FetchRepo/__data__/sample';
import {renderComponent} from '@test/render';

jest.mock('@src/providers/FetchRepo/ContextProvider');

function Component(props) {
	return <RepoDetails data-testid="container" {...props} />;
}

it('should render component.', () => {
	useFetchRepoContext.mockReturnValue({});

	renderComponent(<Component />);

	expect(screen.getByTestId('container')).toBe(screen.getByRole('heading', {name: 'No data'}));
});

it('should render preloader.', () => {
	useFetchRepoContext.mockReturnValue({loading: true});

	renderComponent(<Component />);

	expect(screen.getByTestId('container')).toBe(screen.getByRole('progressbar', {name: 'Please wait'}));
});

it('should render error message.', () => {
	useFetchRepoContext.mockReturnValue(ERROR);

	renderComponent(<Component />);

	expect(screen.getByTestId('container')).toBe(screen.getByRole('heading', {name: 'Something went wrong'}));
});

it('should render data region.', () => {
	useFetchRepoContext.mockReturnValue(DATA);

	renderComponent(<Component />);

	expect(screen.getByTestId('container')).toBe(screen.getByRole('region', {
		name: 'backendless-apollo-client',
		description: 'How to do a Frontend Ahead of Backend demo project',
	}));
});

it('should render languages list.', () => {
	useFetchRepoContext.mockReturnValue(DATA);

	renderComponent(<Component />);

	const languages = screen.getByRole('list', {name: 'Languages'});
	const listitems = within(languages).getAllByRole('listitem');
	expect(listitems).toHaveLength(4);
	expect(listitems[0]).toHaveTextContent('Shell');
	expect(listitems[1]).toHaveTextContent('JavaScript');
	expect(listitems[2]).toHaveTextContent('HTML');
	expect(listitems[3]).toHaveTextContent('CSS');
});

it('should render "created at" date.', () => {
	useFetchRepoContext.mockReturnValue(DATA);

	renderComponent(<Component />);

	const datetime = screen.getByLabelText(/Created at/u);
	expect(datetime).toHaveAccessibleName('Created at 2/28/2023, 12:15:22 PM');
	expect(datetime).toHaveAttribute('dateTime', '2023-02-28T12:15:22.000Z');
});

it('should render license name and link.', () => {
	useFetchRepoContext.mockReturnValue(DATA);

	renderComponent(<Component />);

	const link = screen.getByRole('link', {name: 'MIT License'});
	expect(link).toHaveAttribute('href', 'http://choosealicense.com/licenses/mit/');
	expect(link).toHaveAttribute('target', '_blank');
});
