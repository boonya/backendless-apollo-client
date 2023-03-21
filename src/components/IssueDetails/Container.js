import {useCallback} from 'react';
import Component from '@src/components/Component';
import Reactions from '@src/components/Reactions';
import useAddReaction from '@src/providers/AddReaction/useAddReaction';
import {useFetchIssueContext} from '@src/providers/FetchIssue/ContextProvider';
import useRemoveReaction from '@src/providers/RemoveReaction/useRemoveReaction';

export default function Container(props) {
	const {data} = useFetchIssueContext();
	const [addReaction] = useAddReaction();
	const [removeReaction] = useRemoveReaction();

	const {id, number, title, body, url, reactions} = data;
	const selectedReactions = reactions.map(({content}) => content);

	const onAdd = useCallback((reaction) => {
		addReaction({issueId: id, reaction});
	}, [addReaction, id]);

	const onRemove = useCallback((reaction) => {
		removeReaction({issueId: id, reaction});
	}, [id, removeReaction]);

	return (
		<Component
			component="section"
			aria-labelledby="region-label"
			aria-describedby="region-description"
			{...props}
		>
			<h1 id="region-label">
				<a href={url} target="_blank" rel="noreferrer">[#{number}] {title}</a>
			</h1>
			<h2 id="region-description">{body}</h2>
			<Reactions selected={selectedReactions} onAdd={onAdd} onRemove={onRemove} />
		</Component>
	);
}
