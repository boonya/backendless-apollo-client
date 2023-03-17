import IssuesList from '.';
import {screen} from '@testing-library/react';
import {generatePath} from 'react-router-dom';
import ROUTES from '@src/ROUTES';
import {useFetchIssuesContext} from '@src/providers/FetchIssues/ContextProvider';
import DATA from '@src/providers/FetchIssues/__data__/sample';
import {renderComponent} from '@test/render';

jest.mock('@src/providers/FetchIssues/ContextProvider');

function Component(props) {
	return <IssuesList data-testid="container" {...props} />;
}

function render(component) {
	return renderComponent(component, {router: {
		route: ROUTES.repo,
		params: {name: 'repo-name', owner: 'owner-login'},
	}});
}

it('should render "No issues found".', () => {
	useFetchIssuesContext.mockReturnValue({data: {issues: []}});

	render(<Component />);

	expect(screen.getByTestId('container')).toBe(screen.getByRole('heading', {name: 'No issues found'}));
});

it('should render preloader.', () => {
	useFetchIssuesContext.mockReturnValue({loading: true});

	render(<Component />);

	expect(screen.getByTestId('container')).toBe(screen.getByRole('progressbar', {name: 'Please wait'}));
});

it('should render error message.', () => {
	useFetchIssuesContext.mockReturnValue({error: new Error('Test error')});

	render(<Component />);

	expect(screen.getByTestId('container')).toBe(screen.getByRole('heading', {name: 'Something went wrong'}));
});

it('should render list.', () => {
	useFetchIssuesContext.mockReturnValue(DATA);

	render(<Component />);

	expect(screen.getByTestId('container')).toBe(screen.getByRole('list', {name: 'Issues list'}));
	const listitems = screen.getAllByRole('listitem');
	expect(listitems).toHaveLength(2);

	expect(listitems[0])
		.toHaveTextContent('#9 The issue created for demo purpose Created at 3/17/2023, 1:31:46 PM by boonya');
	expect(listitems[1])
		.toHaveTextContent('#10 Yet another demo issue Created at 3/17/2023, 4:20:38 PM by boonya');
});

it('should render list of links.', () => {
	useFetchIssuesContext.mockReturnValue(DATA);

	render(<Component />);

	const links = screen.getAllByRole('link');

	expect(links[0]).toHaveAccessibleName('#9 The issue created for demo purpose');
	expect(links[0]).toHaveAttribute('href', generatePath(ROUTES.issue, {
		name: 'repo-name',
		owner: 'owner-login',
		number: 9,
	}));

	expect(links[1]).toHaveAccessibleName('#10 Yet another demo issue');
	expect(links[1]).toHaveAttribute('href', generatePath(ROUTES.issue, {
		name: 'repo-name',
		owner: 'owner-login',
		number: 10,
	}));
});
