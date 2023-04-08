import IssueDetails from '.';
import {fireEvent, screen, within} from '@testing-library/react';
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
});

it('should render reactions menu.', () => {
	useFetchIssueContext.mockReturnValue(DATA);

	render(<Component />);

	const group = screen.getByRole('list', {name: 'Reactions'});

	const unselected = within(group).getAllByRole('button', {pressed: false});
	expect(unselected).toHaveLength(7);
	expect(unselected[0]).toHaveAccessibleName('CONFUSED');
	expect(unselected[1]).toHaveAccessibleName('EYES');
	expect(unselected[2]).toHaveAccessibleName('HEART');
	expect(unselected[3]).toHaveAccessibleName('LAUGH');
	expect(unselected[4]).toHaveAccessibleName('ROCKET');
	expect(unselected[5]).toHaveAccessibleName('THUMBS_DOWN');
	expect(unselected[6]).toHaveAccessibleName('THUMBS_UP');

	const selected = within(group).getByRole('button', {pressed: true});
	expect(selected).toHaveAccessibleName('HOORAY');
});

it('should handle "add reaction".', () => {
	useFetchIssueContext.mockReturnValue(DATA);

	render(<Component />);

	const group = screen.getByRole('list', {name: 'Reactions'});
	const reaction = within(group).getByRole('button', {
		name: 'ROCKET',
		pressed: false,
	});
	fireEvent.click(reaction);

	expect(addReaction).toBeCalledTimes(1);
	expect(addReaction).toBeCalledWith({issueId: DATA.data.id, reaction: 'ROCKET'});
});

it('should handle "remove reaction".', () => {
	useFetchIssueContext.mockReturnValue(DATA);

	render(<Component />);

	const group = screen.getByRole('list', {name: 'Reactions'});
	const reaction = within(group).getByRole('button', {
		name: 'HOORAY',
		pressed: true,
	});
	fireEvent.click(reaction);

	expect(removeReaction).toBeCalledTimes(1);
	expect(removeReaction).toBeCalledWith({issueId: DATA.data.id, reaction: 'HOORAY'});
});
