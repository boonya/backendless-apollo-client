import './index.css';
import Greetings from '@src/components/Greetings';
import MeProvider from '@src/providers/Me';

export default function App() {
	return (
		<MeProvider>
			<div className="App">
				<header className="App-header">
					<Greetings />
					<a
						href="https://studio.apollographql.com/public/github/home?variant=current"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span role="img" aria-label="Waving">👋</span>
						{' '}
						Welcome to the GitHub GraphQL API
						{' '}
						<span role="img" aria-label="Octopus">🐙</span>
					</a>
				</header>
			</div>
		</MeProvider>
	);
}
