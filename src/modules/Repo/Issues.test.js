import Issues from './Issues';
import {fireEvent, screen} from '@testing-library/react';
import ROUTES from '@src/ROUTES';
import IssuesList from '@src/components/IssuesList';
import FetchIssuesDataProvider from '@src/providers/FetchIssues/Fetch';
import {useFetchRepoContext} from '@src/providers/FetchRepo/ContextProvider';
import REPO from '@src/providers/FetchRepo/__data__/sample';
import {renderComponent} from '@test/render';

jest.mock('@src/components/IssuesList');
jest.mock('@src/providers/FetchIssues/Fetch');
jest.mock('@src/providers/FetchRepo/ContextProvider');

beforeEach(() => {
	FetchIssuesDataProvider.mockImplementation(({children}) => <span data-testid="fake-dataprovider">{children}</span>);
	IssuesList.mockImplementation(() => <span data-testid="fake-issues-list" />);
	useFetchRepoContext.mockReturnValue(REPO);
});

function Component(props) {
	return <Issues data-testid="issues" {...props} />;
}

function render(component) {
	return renderComponent(component, {router: {
		route: ROUTES.repo,
		params: {name: 'repo-name', owner: 'owner-login'},
	}});
}

it('should render nothing.', () => {
	useFetchRepoContext.mockReturnValue({data: undefined});

	const {container} = render(<Component />);

	expect(container).toBeEmptyDOMElement();
});

it('should render button and no list.', () => {
	render(<Component />);

	screen.getByTestId('issues');
	screen.getByRole('button', {name: 'Want to see issues?'});

	expect(screen.queryByTestId('fake-dataprovider')).not.toBeInTheDocument();
	expect(screen.queryByTestId('fake-issues-list')).not.toBeInTheDocument();
});

it('should render another button and a list.', async () => {
	render(<Component />);

	const button = screen.getByRole('button', {name: 'Want to see issues?'});
	fireEvent.click(button);

	await screen.findByRole('button', {name: 'Hide them'});

	screen.getByTestId('fake-dataprovider');
	screen.getByTestId('fake-issues-list');

	expect(FetchIssuesDataProvider).toBeCalledWith(expect.objectContaining({
		name: 'repo-name',
		owner: 'owner-login',
	}), {});
});

it('should hide the list.', async () => {
	render(<Component />);

	const show = screen.getByRole('button', {name: 'Want to see issues?'});
	fireEvent.click(show);

	const hide = await screen.findByRole('button', {name: 'Hide them'});
	fireEvent.click(hide);

	await screen.findByRole('button', {name: 'Want to see issues?'});

	expect(screen.queryByTestId('fake-dataprovider')).not.toBeInTheDocument();
	expect(screen.queryByTestId('fake-issues-list')).not.toBeInTheDocument();
});
