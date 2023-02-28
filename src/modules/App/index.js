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
						className="App-link"
						href="https://studio.apollographql.com/public/github/home?variant=current"
						target="_blank"
						rel="noopener noreferrer"
					>
						👋 Welcome to the GitHub GraphQL API 🐙
					</a>
				</header>
			</div>
		</MeProvider>
	);
}
