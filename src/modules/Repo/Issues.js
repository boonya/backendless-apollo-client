import {useCallback, useState} from 'react';
import ErrorBoundary from '@src/components/ErrorBoundary';
import ExtendableComponent from '@src/components/ExtendableComponent';
import './Issues.css';
import IssuesList from '@src/components/IssuesList';

export default function Issues(props) {
	const [issues, setIssues] = useState(false);
	const showIssues = useCallback(() => setIssues(true), []);
	const hideIssues = useCallback(() => setIssues(false), []);

	return (
		<ErrorBoundary>
			<ExtendableComponent className="issues" {...props}>
				{!issues && <button type="button" onClick={showIssues}>Want to see issues?</button>}
				{issues && <button type="button" onClick={hideIssues}>Hide them</button>}
				{issues && <IssuesList />}
			</ExtendableComponent>
		</ErrorBoundary>
	);
}
