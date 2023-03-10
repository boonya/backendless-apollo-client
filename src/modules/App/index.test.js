import App from '.';
import {render, screen} from '@testing-library/react';
import MeProvider from '@src/providers/Me';
import MeContextProvider from '@src/providers/Me/ContextProvider';
import VALIDATION_ERROR_DATA from '@src/providers/Me/__data__/ValidationError';
import ME_DATA from '@src/providers/Me/__data__/success';
import wrapper from '@test/decorators/wrapper';

jest.mock('@src/providers/Me');

it('should render Greetings if loading.', () => {
	MeProvider.mockImplementation(wrapper({loading: true}, MeContextProvider));

	render(<App />);

	screen.getByText('Please wait...');
});

it('should render Greetings if error.', () => {
	MeProvider.mockImplementation(wrapper(VALIDATION_ERROR_DATA, MeContextProvider));

	render(<App />);

	screen.getByText('Hello, Mr(s)!');
});

it('should render Greetings if success.', () => {
	MeProvider.mockImplementation(wrapper(ME_DATA, MeContextProvider));

	render(<App />);

	screen.getByText('Hello, Dude Dudovich!');
});
