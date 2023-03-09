import Component from '.';
import {within} from '@storybook/testing-library';
import {screen} from '@testing-library/react';
import {useLicensesContext} from '@src/providers/FetchLicenses/ContextProvider';
import DATA from '@src/providers/FetchLicenses/__data__/sample.json';
import {renderComponent} from '@test/render';

jest.mock('@src/providers/FetchLicenses/ContextProvider');

it('should render a progressbar.', () => {
	useLicensesContext.mockReturnValue({loading: true});

	renderComponent(<Component />);

	screen.getByRole('progressbar');

	expect(screen.queryByRole('list')).not.toBeInTheDocument();
	expect(screen.queryByRole('heading')).not.toBeInTheDocument();
});

it('should render a list of licenses.', () => {
	useLicensesContext.mockReturnValue(DATA);

	renderComponent(<Component />);

	const list = screen.getByRole('list', {name: 'Licenses'});
	expect(within(list).getAllByRole('listitem')).toHaveLength(3);

	expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
	expect(screen.queryByRole('heading')).not.toBeInTheDocument();
});

it('should render links.', () => {
	useLicensesContext.mockReturnValue(DATA);

	renderComponent(<Component />);

	expect(screen.getByRole('link', {name: 'BSD 3-Clause "New" or "Revised" License'}))
		.toHaveAttribute('href', '/license/bsd-3-clause');

	expect(screen.getByRole('link', {name: 'MIT License'}))
		.toHaveAttribute('href', '/license/mit');

	expect(screen.getByRole('link', {name: 'The Unlicense'}))
		.toHaveAttribute('href', '/license/unlicense');
});

it('should render "No Data" message.', () => {
	useLicensesContext.mockReturnValue({});

	renderComponent(<Component />);

	screen.getByRole('heading', {name: 'There is no licenses list.'});

	expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
	expect(screen.queryByRole('list')).not.toBeInTheDocument();
});

it('should render "Error" message.', () => {
	useLicensesContext.mockReturnValue({error: new Error('Test error')});

	renderComponent(<Component />);

	screen.getByRole('heading', {name: 'Failed to fetch licenses list.'});

	expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
	expect(screen.queryByRole('list')).not.toBeInTheDocument();
});
