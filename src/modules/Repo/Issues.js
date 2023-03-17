import {useCallback, useState} from 'react';
import {useParams} from 'react-router-dom';
import Component from '@src/components/Component';
import './Issues.css';
import FetchIssues from '@src/providers/FetchIssues';
import {useFetchRepoContext} from '@src/providers/FetchRepo/ContextProvider';

export default function Issues(props) {
	const {data} = useFetchRepoContext();
	const {name, owner} = useParams();

	const [issues, setIssues] = useState(false);
	const showIssues = useCallback(() => setIssues(true), []);
	const hideIssues = useCallback(() => setIssues(false), []);

	if (!data) {
		return null;
	}

	return (
		<Component className="issues" {...props}>
			{!issues && <button type="button" onClick={showIssues}>Want to see issues?</button>}
			{issues && <button type="button" onClick={hideIssues}>Hide them</button>}
			{issues && (
				<FetchIssues name={name} owner={owner}>
					<h1>Not implemented yet...</h1>
				</FetchIssues>
			)}
		</Component>
	);
}
