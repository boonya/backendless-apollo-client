import './index.css';
import Issues from './Issues';
import ErrorBoundary from '@src/components/ErrorBoundary';
import RepoDetails from '@src/components/RepoDetails';

export default function Repo() {
	return (
		<div className="repo">
			<ErrorBoundary>
				<RepoDetails component="header" />
				<Issues component="main" />
			</ErrorBoundary>
		</div>
	);
}
