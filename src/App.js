import PropTypes from 'prop-types';
import {lazy, Suspense} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ROUTES from '@src/ROUTES';
import ErrorBoundary from '@src/components/ErrorBoundary';
import LoadingSpinner from '@src/components/LoadingSpinner';
import NotFound from '@src/components/NotFound';

const Home = lazy(() => import(/* webpackChunkName: "modules/Home" */ '@src/modules/Home'));

export default function App({basename}) {
	return (
		<ErrorBoundary>
			<Suspense fallback={<LoadingSpinner />}>
				<BrowserRouter basename={basename}>
					<Routes>
						<Route path={ROUTES.home} element={<Home />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</Suspense>
		</ErrorBoundary>
	);
}

App.propTypes = {
	basename: PropTypes.string.isRequired,
};
