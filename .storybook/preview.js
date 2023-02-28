import {initialize, mswDecorator} from 'msw-storybook-addon';
import withApollo from '@sb/decorators/withApollo';
import withRouter from '@sb/decorators/withRouter';

// Initialize MSW
initialize({
	serviceWorker: {url: `${APP_PREFIX}mockServiceWorker.js`},
	onUnhandledRequest: 'bypass',
});

export const decorators = [
	(Story, {parameters}) => (
		<div style={parameters.style}>
			<Story />
		</div>
	),
	withApollo(),
	withRouter(),
	mswDecorator,
];

export const parameters = {
	actions: {argTypesRegex: '^on[A-Z].*'},
	controls: {
		matchers: {
			color: /(?:background|color)$/iu,
			date: /(?:date|dateTime|time)$/iu,
		},
	},
};
