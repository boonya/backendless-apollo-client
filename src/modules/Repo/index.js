import './index.css';
import Issues from './Issues';
import {useParams} from 'react-router-dom';
import ErrorBoundary from '@src/components/ErrorBoundary';
import RepoDetails from '@src/components/RepoDetails';
import FetchRepoDataProvider from '@src/providers/FetchRepo/Fetch';

export default function Repo() {
	const {name, owner} = useParams();

	return (
		<div className="repo">
			<ErrorBoundary>
				<FetchRepoDataProvider name={name} owner={owner}>
					<RepoDetails component="header" />
					<Issues component="main" />
				</FetchRepoDataProvider>
			</ErrorBoundary>
		</div>
	);
}
