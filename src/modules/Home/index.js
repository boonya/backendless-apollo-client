import './index.css';
import Greetings from '@src/components/Greetings';
import LicensesList from '@src/components/LicensesList';
import LicensesProvider from '@src/providers/FetchLicenses';
import MeProvider from '@src/providers/FetchMe';

export default function Home() {
	return (
		<MeProvider>
			<LicensesProvider>
				<div className="App">
					<header className="App-header">
						<Greetings component="h1" />
						<h2>
							<a
								href="https://studio.apollographql.com/public/github/home?variant=current"
								target="_blank"
								rel="noopener noreferrer"
							>
								<span aria-hidden>👋</span>
								{' '}
								Welcome to the GitHub GraphQL API
								{' '}
								<span aria-hidden>🐙</span>
							</a>
						</h2>
					</header>
					<main className="App-main">
						<LicensesList />
					</main>
				</div>
			</LicensesProvider>
		</MeProvider>
	);
}
