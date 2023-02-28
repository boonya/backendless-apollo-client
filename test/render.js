import {
	render as originalRender,
	renderHook as originalRenderHook,
} from '@testing-library/react';
import mediaQuery from 'css-mediaquery';
import DecoratorsReducer from '@test/DecoratorsReducer';
import Router from '@test/Router';

/**
 * @param {number} width
 * @returns {Function}
 */
function createMatchMedia(width) {
	return (query) => ({
		matches: mediaQuery.match(query, {width}),
		addListener: () => null,
		removeListener: () => null,
	});
}

/**
 * @typedef {object} WrapperOptions
 * @property {number} [windowWidth]
 * @property {JSX.Element} [wrapper]
 * @property {JSX.Element[]} [decorators]
 * @property {import('@test/Router').RouterProps} [router]
 *
 * @param {WrapperOptions} [options]
 * @returns {Function}
 */
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

/**
 * @typedef {WrapperOptions} Options
 *
 * @param {Options} [options]
 * @returns {{wrapper: WrapperOptions, original: object}}
 */
function extractOptions(options) {
	const {windowWidth, lng, i18n, wrapper, decorators, ...original} = options || {};
	return {
		wrapper: {windowWidth, lng, i18n, wrapper, decorators},
		original,
	};
}

/**
 * @param {Node} component
 * @param {Options} [options]
 * @returns {RenderResult}
 */
export function renderComponent(component, options = {}) {
	const {wrapper, original} = extractOptions(options);
	return originalRender(component, {
		wrapper: createWrapper(wrapper),
		...original,
	});
}

/**
 * @param {Function} hook
 * @param {Options} [options]
 * @returns {RenderHookResult}
 */
export function renderHook(hook, options = {}) {
	const {wrapper, original} = extractOptions(options);
	const {result} = originalRenderHook(hook, {
		wrapper: createWrapper(wrapper),
		...original,
	});
	return result;
}
