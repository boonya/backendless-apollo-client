import {generatePath, Link, useParams} from 'react-router-dom';
import ROUTES from '@src/ROUTES';
import ErrorBoundary from '@src/components/ErrorBoundary';
import IssueDetails from '@src/components/IssueDetails';

export default function Issue() {
	const {name, owner} = useParams();

	return (
		<div className="issue">
			<ErrorBoundary>
				<Link to={generatePath(ROUTES.repo, {name, owner})}>To home</Link>
				<IssueDetails />
			</ErrorBoundary>
		</div>
	);
}
