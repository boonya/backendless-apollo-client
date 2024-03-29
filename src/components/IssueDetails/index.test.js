import IssueDetails from '.';
import {fireEvent, screen, waitFor, within} from '@testing-library/react';
import ROUTES from '@src/ROUTES';
import ADD_REACTION_RESPONSE from '@src/providers/AddReaction/__response__/sample.json';
import useAddReaction from '@src/providers/AddReaction/useAddReaction';
import {useFetchIssueContext} from '@src/providers/FetchIssue/ContextProvider';
import DATA from '@src/providers/FetchIssue/__data__/sample';
import REMOVE_REACTION_RESPONSE from '@src/providers/RemoveReaction/__response__/sample.json';
import useRemoveReaction from '@src/providers/RemoveReaction/useRemoveReaction';
import {renderComponent} from '@test/render';

jest.mock('@src/providers/FetchIssue/ContextProvider');
jest.mock('@src/providers/RemoveReaction/useRemoveReaction');
jest.mock('@src/providers/AddReaction/useAddReaction');

const addReaction = jest.fn(async () => ADD_REACTION_RESPONSE);
const removeReaction = jest.fn(async () => REMOVE_REACTION_RESPONSE);

beforeEach(() => {
	useFetchIssueContext.mockReturnValue({});
	useAddReaction.mockReturnValue([addReaction, {}]);
	useRemoveReaction.mockReturnValue([removeReaction, {}]);
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

	screen.getByRole('list', {name: 'Reactions'});
});

it('should handle "add reaction".', async () => {
	useFetchIssueContext.mockReturnValue(DATA);

	render(<Component />);

	const group = screen.getByRole('list', {name: 'Reactions'});
	const reaction = within(group).getByRole('button', {
		name: 'ROCKET',
		pressed: false,
	});
	fireEvent.click(reaction);

	await waitFor(() => expect(addReaction).toBeCalled());
	// expect(addReaction).toBeCalledTimes(1);
	expect(addReaction).toBeCalledWith({issueId: DATA.data.id, reaction: 'ROCKET'});
});

it('should handle "remove reaction".', async () => {
	useFetchIssueContext.mockReturnValue(DATA);

	render(<Component />);

	const group = screen.getByRole('list', {name: 'Reactions'});
	const reaction = within(group).getByRole('button', {
		name: 'HOORAY',
		pressed: true,
	});
	fireEvent.click(reaction);

	await waitFor(() => expect(removeReaction).toBeCalled());
	// expect(removeReaction).toBeCalledTimes(1);
	expect(removeReaction).toBeCalledWith({issueId: DATA.data.id, reaction: 'HOORAY'});
});
