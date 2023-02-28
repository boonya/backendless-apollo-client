import PropTypes from 'prop-types';
import {Router as ReactRouter, Routes, Route, generatePath} from 'react-router-dom';
import ROUTES from '@src/ROUTES';

function createHref({pathname, search, hash}) {
	const joined = [pathname, search].filter((v) => v?.trim()).join('?');
	return [joined, hash].filter((v) => v?.trim()).join('');
}

/**
 * @param {RouterProps} props
 * @returns {React.ElementType}
 */
export default function Router({
	onPush,
	onReplace,
	onGo,
	onBack,
	onForward,
	route,
	params,
	queryString,
	children,
}) {
	/**
	 * @see: https://github.com/remix-run/history/blob/dev/docs/api-reference.md#navigation
	 */
	const navigator = {
		push: onPush,
		replace: onReplace,
		go: onGo,
		back: onBack,
		forward: onForward,
		createHref,
	};

	const location = [
		generatePath(route, params),
		queryString,
	].join('?');

	return (
		<ReactRouter navigator={navigator} location={location}>
			<Routes>
				<Route path={route} element={children} />
			</Routes>
		</ReactRouter>
	);
}

/**
 * @typedef {object} RouterProps
 * @property {string} [route] "/" by default.
 * @property {{[key: string]: string}} [params] "{}" by default.
 * @property {string} [queryString]
 * @property {Function} [onBack]
 * @property {Function} [onForward]
 * @property {Function} [onGo]
 * @property {Function} [onPush]
 * @property {Function} [onReplace]
 */
Router.propTypes = {
	children: PropTypes.node.isRequired,
	onBack: PropTypes.func,
	onForward: PropTypes.func,
	onGo: PropTypes.func,
	onPush: PropTypes.func,
	onReplace: PropTypes.func,
	params: PropTypes.shape({}),
	queryString: PropTypes.string,
	route: PropTypes.string,
};

Router.defaultProps = {
	onBack: () => null,
	onForward: () => null,
	onGo: () => null,
	onPush: () => null,
	onReplace: () => null,
	params: {},
	queryString: undefined,
	route: ROUTES.home,
};
