import List from './List';
import {useState, useCallback} from 'react';
import useAddReaction from '@src/providers/AddReaction/useAddReaction';
import {useFetchIssueContext} from '@src/providers/FetchIssue/ContextProvider';
import useRemoveReaction from '@src/providers/RemoveReaction/useRemoveReaction';

export default function Reactions(props) {
	const [pending, setPending] = useState([]);

	const {data} = useFetchIssueContext();
	const {id} = data;

	const includePending = useCallback((name) => {
		setPending((prev) => [...prev, name]);
	}, []);

	const excludePending = useCallback((name) => {
		setPending((prev) => prev.filter((i) => i !== name));
	}, []);

	const [addReaction] = useAddReaction();
	const [removeReaction] = useRemoveReaction();
	const reactions = data.reactions.map(({content}) => content);

	const onAdd = useCallback(async (reaction) => {
		try {
			includePending(reaction);
			await addReaction({issueId: id, reaction});
		}
		catch (err) {
			// eslint-disable-next-line no-alert
			alert(err.message);
		}
		finally {
			excludePending(reaction);
		}
	}, [addReaction, excludePending, id, includePending]);

	const onRemove = useCallback(async (reaction) => {
		try {
			includePending(reaction);
			await removeReaction({issueId: id, reaction});
		}
		catch (err) {
			// eslint-disable-next-line no-alert
			alert(err.message);
		}
		finally {
			excludePending(reaction);
		}
	}, [excludePending, id, includePending, removeReaction]);

	return <List selected={reactions} pending={pending} onAdd={onAdd} onRemove={onRemove} {...props} />;
}
