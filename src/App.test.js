import {screen, render} from '@testing-library/react';
import App from '@src/App';

it('should render an App', async () => {
	render(<App basename="/" />);

	await screen.findByRole('heading', {name: 'My own version of Create React App'});
});
