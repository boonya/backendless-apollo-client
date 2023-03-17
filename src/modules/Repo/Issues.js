import {useCallback, useState} from 'react';
import Component from '@src/components/Component';
import './Issues.css';
// import IssuesList from '@src/components/IssuesList';
// import IssuesProvider from '@src/providers/FetchIssues';

export default function Issues(props) {
	const [issues, setIssues] = useState(false);
	const showIssues = useCallback(() => setIssues(true), []);
	const hideIssues = useCallback(() => setIssues(false), []);

	return (
		<Component className="issues" {...props}>
			{!issues && <button type="button" onClick={showIssues}>Want to see issues?</button>}
			{issues && <button type="button" onClick={hideIssues}>Hide them</button>}
			{issues && <h1>Not implemented yet...</h1>}
		</Component>
	);
}
