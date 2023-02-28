import Home from '.';
import {screen} from '@testing-library/react';
import {renderComponent} from '@test/render';

it('should render an App', () => {
	renderComponent(<Home />);

	screen.getByRole('heading', {name: 'My own version of Create React App'});
});
