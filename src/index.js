import ROUTES from './ROUTES';
import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route, Navigate, generatePath} from 'react-router-dom';
import ErrorBoundary from '@src/components/ErrorBoundary';
import NotFound from '@src/components/NotFound';
import Progressbar from '@src/components/Progressbar';
import ApolloProvider from '@src/providers/Apollo';
import ThemeProvider from '@src/providers/Theme';

const Repo = lazy(() => import(/* webpackChunkName: "modules/Repo" */'@src/modules/Repo'));
const Issue = lazy(() => import(/* webpackChunkName: "modules/Issue" */'@src/modules/Issue'));

const baseRoute = generatePath(ROUTES.repo, {name: 'backendless-apollo-client', owner: 'boonya'});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ApolloProvider>
			<ThemeProvider>
				<ErrorBoundary>
					<BrowserRouter basename={APP_PREFIX}>
						<Suspense fallback={<Progressbar />}>
							<Routes>
								<Route index element={<Navigate to={baseRoute} replace />} />
								<Route path={ROUTES.repo} element={<Repo />} />
								<Route path={ROUTES.issue} element={<Issue />} />
								<Route path="*" element={<NotFound />} />
							</Routes>
						</Suspense>
					</BrowserRouter>
				</ErrorBoundary>
			</ThemeProvider>
		</ApolloProvider>
	</React.StrictMode>
);
