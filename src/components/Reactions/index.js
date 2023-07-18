import List from './List';
import {useCallback} from 'react';
import {useFetchIssueContext} from '@src/providers/FetchIssue/ContextProvider';

export default function Reactions(props) {
	const {data} = useFetchIssueContext();

	const reactions = data.reactions.map(({content}) => content);

	// eslint-disable-next-line no-alert
	const actionHandler = useCallback(() => alert('Not implemented yet!'), []);

	return <List selected={reactions} onAdd={actionHandler} onRemove={actionHandler} {...props} />;
}
