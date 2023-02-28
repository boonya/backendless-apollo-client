import {action} from '@storybook/addon-actions';
import Router from '@test/Router';

/**
 * Returns a function decorator to wrap a story by the `Router`.
 *
 * @returns {import('@sb/preview').Decorator}
 */
export default function withRouter() {
	return (Story, {parameters}) => (
		<Router
			onPush={action('history.push')}
			onReplace={action('history.replace')}
			onGo={action('history.go')}
			onBack={action('history.back')}
			onForward={action('history.forward')}
			basename="/"
			{...parameters.router}
		>
			<Story />
		</Router>
	);
}
