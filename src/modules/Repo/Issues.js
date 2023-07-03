import {useCallback, useState} from 'react';
import {useParams} from 'react-router-dom';
import ErrorBoundary from '@src/components/ErrorBoundary';
import ExtendableComponent from '@src/components/ExtendableComponent';
import './Issues.css';
import IssuesList from '@src/components/IssuesList';
import FetchIssuesDataProvider from '@src/providers/FetchIssues/Fetch';
import {useFetchRepoContext} from '@src/providers/FetchRepo/ContextProvider';

export default function Issues(props) {
	const {data: repository} = useFetchRepoContext();
	const {name, owner} = useParams();

	const [issues, setIssues] = useState(false);
	const showIssues = useCallback(() => setIssues(true), []);
	const hideIssues = useCallback(() => setIssues(false), []);

	if (!repository) {
		return null;
	}

	return (
		<ErrorBoundary>
			<ExtendableComponent className="issues" {...props}>
				{!issues && <button type="button" onClick={showIssues}>Want to see issues?</button>}
				{issues && <button type="button" onClick={hideIssues}>Hide them</button>}
				{issues && (
					<FetchIssuesDataProvider name={name} owner={owner}>
						<IssuesList />
					</FetchIssuesDataProvider>
				)}
			</ExtendableComponent>
		</ErrorBoundary>
	);
}
