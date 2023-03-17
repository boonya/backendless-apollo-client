import Repo from '.';
import {screen} from '@testing-library/react';
import FetchRepoProvider from '@src/providers/FetchRepo';
import FetchRepoContextProvider from '@src/providers/FetchRepo/ContextProvider';
import REPO_DATA from '@src/providers/FetchRepo/__data__/sample';
import wrapper from '@test/decorators/wrapper';
import {renderComponent} from '@test/render';

jest.mock('@src/providers/FetchRepo');

it('should render a happy path.', () => {
	FetchRepoProvider.mockImplementation(wrapper(REPO_DATA, FetchRepoContextProvider));

	renderComponent(<Repo />);

	screen.getByRole('banner', {
		name: 'backendless-apollo-client',
		description: 'How to do a Frontend Ahead of Backend demo project',
	});
});
