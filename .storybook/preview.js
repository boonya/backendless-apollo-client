import {initialize, mswDecorator} from 'msw-storybook-addon';
import withApollo from '@sb/decorators/withApollo';
import withRouter from '@sb/decorators/withRouter';
import withStyle from '@sb/decorators/withStyle';
import withTheme, {getThemeToolbar} from '@sb/decorators/withTheme';

// Initialize MSW
initialize({
	serviceWorker: {url: `${APP_PREFIX}mockServiceWorker.js`},
	onUnhandledRequest: 'bypass',
});

export const decorators = [
	withStyle(),
	withTheme(),
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
	backgrounds: {disable: true},
};

export const globalTypes = {
	theme: getThemeToolbar(),
};
