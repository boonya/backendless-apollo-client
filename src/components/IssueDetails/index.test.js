import IssueDetails from '.';
import {screen, within} from '@testing-library/react';
import ROUTES from '@src/ROUTES';
import {useFetchIssueContext} from '@src/providers/FetchIssue/ContextProvider';
import DATA from '@src/providers/FetchIssue/__data__/sample';
import {renderComponent} from '@test/render';

jest.mock('@src/providers/FetchIssue/ContextProvider');

beforeEach(() => {
	useFetchIssueContext.mockReturnValue({});
});

function Component(props) {
	return <IssueDetails data-testid="container" {...props} />;
}

function render(component) {
	return renderComponent(component, {router: {
		route: ROUTES.issue,
		params: {name: 'repo-name', owner: 'owner-login', number: 9},
	}});
}

it('should render progressbar.', () => {
	useFetchIssueContext.mockReturnValue({loading: true});

	render(<Component />);

	expect(screen.getByTestId('container')).toBe(screen.getByRole('progressbar', {name: 'Please wait'}));
});

it('should render "Not Found" message.', () => {
	useFetchIssueContext.mockReturnValue({});

	render(<Component />);

	expect(screen.getByTestId('container')).toBe(screen.getByRole('heading', {name: 'Not Found.'}));
});

it('should render error message.', () => {
	useFetchIssueContext.mockReturnValue({error: new Error('Test')});

	render(<Component />);

	expect(screen.getByTestId('container')).toBe(screen.getByRole('heading', {name: 'Something went wrong'}));
});

it('should render details.', () => {
	useFetchIssueContext.mockReturnValue(DATA);

	render(<Component />);

	expect(screen.getByTestId('container')).toBe(screen.getByRole('region', {
		name: '[#9] The issue created for demo purpose',
		description: '',
	}));

	const link = screen.getByRole('link', {name: '[#9] The issue created for demo purpose'});
	expect(link).toHaveAttribute('href', 'https://github.com/boonya/backendless-apollo-client/issues/9');
	expect(link).toHaveAttribute('target', '_blank');

	const reactions = screen.getByRole('list', {name: 'Selected reactions'});
	const listitem = within(reactions).getByRole('listitem');
	expect(listitem).toBeInTheDocument();
	within(reactions).getByRole('listitem', {name: 'HOORAY'});
});
