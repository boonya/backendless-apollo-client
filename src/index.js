import ROUTES from './ROUTES';
import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Progressbar from '@src/components/Progressbar';
import ApolloProvider from '@src/providers/Apollo';
import ThemeProvider from '@src/providers/Theme';

const Home = lazy(() => import(/* webpackChunkName: "modules/Home" */'@src/modules/Home'));
const License = lazy(() => import(/* webpackChunkName: "modules/License" */'@src/modules/License'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ApolloProvider>
			<ThemeProvider>
				<BrowserRouter basename={APP_PREFIX}>
					<Suspense fallback={<Progressbar />}>
						<Routes>
							<Route index element={<Home />} />
							<Route path={ROUTES.license} element={<License />} />
							<Route path="*" element={<h1>Not found</h1>} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</ThemeProvider>
		</ApolloProvider>
	</React.StrictMode>
);
