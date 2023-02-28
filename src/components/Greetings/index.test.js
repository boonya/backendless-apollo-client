import Greetings from '.';
import {screen} from '@testing-library/react';
import {useMe} from '@src/providers/Me/ContextProvider';
import ME_DATA from '@src/providers/Me/__data__/success';
import {renderComponent} from '@test/render';

jest.mock('@src/providers/Me/ContextProvider');

function render() {
	return renderComponent(<Greetings />);
}

it('should render progressbar.', () => {
	useMe.mockReturnValue({loading: true});

	render();

	expect(screen.queryByText(/Hello/u)).not.toBeInTheDocument();
	screen.getByRole('progressbar');
});

it('should render user name.', () => {
	useMe.mockReturnValue(ME_DATA);

	render();

	screen.getByText('Hello, Dude Dudovich!');
});

it('should render "Dude" as a fallback value.', () => {
	useMe.mockReturnValue({});

	render();

	screen.getByText('Hello, Mr(s)!');
});
