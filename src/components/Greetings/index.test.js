import Greetings from '.';
import {screen} from '@testing-library/react';
import {useMeContext} from '@src/providers/FetchMe/ContextProvider';
import ME_DATA from '@src/providers/FetchMe/__data__/success';
import {renderComponent} from '@test/render';

jest.mock('@src/providers/FetchMe/ContextProvider');

it('should render progressbar.', () => {
	useMeContext.mockReturnValue({loading: true});

	renderComponent(<Greetings />);

	expect(screen.queryByText(/Hello/u)).not.toBeInTheDocument();
	screen.getByRole('progressbar');
});

it('should render user name.', () => {
	useMeContext.mockReturnValue(ME_DATA);

	renderComponent(<Greetings component="h1" />);

	screen.getByRole('heading', {name: 'Hello, Dude Dudovich!'});
});

it('should render "Dude" as a fallback value.', () => {
	useMeContext.mockReturnValue({});

	renderComponent(<Greetings component="h1" />);

	screen.getByRole('heading', {name: 'Hello, Mr(s)!'});
});
