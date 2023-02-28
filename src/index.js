import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@src/modules/App';
import ApolloProvider from '@src/providers/Apollo';
import ThemeProvider from '@src/providers/Theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ApolloProvider>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</ApolloProvider>
	</React.StrictMode>
);
