import {generatePath, Link, useParams} from 'react-router-dom';
import ROUTES from '@src/ROUTES';
import ErrorBoundary from '@src/components/ErrorBoundary';
import IssueDetails from '@src/components/IssueDetails';
import FetchIssueDataProvider from '@src/providers/FetchIssue';

export default function Issue() {
	const {name, owner, number} = useParams();

	return (
		<div className="issue">
			<ErrorBoundary>
				<Link to={generatePath(ROUTES.repo, {name, owner})}>To home</Link>
				<FetchIssueDataProvider name={name} owner={owner} number={Number(number)}>
					<IssueDetails />
				</FetchIssueDataProvider>
			</ErrorBoundary>
		</div>
	);
}
