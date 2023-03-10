import Home from '.';
import {screen} from '@testing-library/react';
import FetchLicensesProvider from '@src/providers/FetchLicenses';
import FetchLicensesContextProvider from '@src/providers/FetchLicenses/ContextProvider';
import LICENSES_DATA from '@src/providers/FetchLicenses/__data__/sample.json';
import FetchMeProvider from '@src/providers/FetchMe';
import FetchMeContextProvider from '@src/providers/FetchMe/ContextProvider';
import ME_DATA from '@src/providers/FetchMe/__data__/success';
import wrapper from '@test/decorators/wrapper';
import {renderComponent} from '@test/render';

jest.mock('@src/providers/FetchMe');
jest.mock('@src/providers/FetchLicenses');

it('should render a happy path.', () => {
	FetchMeProvider.mockImplementation(wrapper(ME_DATA, FetchMeContextProvider));
	FetchLicensesProvider.mockImplementation(wrapper(LICENSES_DATA, FetchLicensesContextProvider));

	renderComponent(<Home />);

	screen.getByRole('heading', {name: 'Hello, Dude Dudovich!'});
	screen.getByRole('link', {name: 'Welcome to the GitHub GraphQL API'});
	screen.getByRole('link', {name: 'BSD 3-Clause "New" or "Revised" License'});
	screen.getByRole('link', {name: 'MIT License'});
	screen.getByRole('link', {name: 'The Unlicense'});
});
