import {
	render as originalRender,
	renderHook as originalRenderHook,
} from '@testing-library/react';
import mediaQuery from 'css-mediaquery';
import DecoratorsReducer from '@test/DecoratorsReducer';
import Router from '@test/Router';

function createMatchMedia(width) {
	return (query) => ({
		matches: mediaQuery.match(query, {width}),
		addListener: () => null,
		removeListener: () => null,
	});
}

function createWrapper(options = {}) {
	const {
		windowWidth = 1280,
		wrapper: CustomWrapper = ({children}) => children,
		decorators = [],
		router,
	} = options;

	function Wrapper({children}) {
		// polyfill matchMedia to have ability to run useMadiaQuery hook.
		window.matchMedia = createMatchMedia(windowWidth);

		return (
			<Router {...router}>
				<CustomWrapper>
					<DecoratorsReducer decorators={decorators}>
						{children}
					</DecoratorsReducer>
				</CustomWrapper>
			</Router>
		);
	}

	return Wrapper;
}

function extractOptions(options) {
	const {windowWidth, lng, i18n, wrapper, decorators, router, ...original} = options || {};
	return {
		wrapper: {windowWidth, lng, i18n, wrapper, decorators, router},
		original,
	};
}

export function renderComponent(component, options = {}) {
	const {wrapper, original} = extractOptions(options);
	return originalRender(component, {
		wrapper: createWrapper(wrapper),
		...original,
	});
}

export function renderHook(hook, options = {}) {
	const {wrapper, original} = extractOptions(options);
	return originalRenderHook(hook, {
		wrapper: createWrapper(wrapper),
		...original,
	});
}
