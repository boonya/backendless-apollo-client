import {useCallback} from 'react';
import Component from '@src/components/Component';
import Reactions from '@src/components/Reactions';
import {useFetchIssueContext} from '@src/providers/FetchIssue/ContextProvider';

export default function Container(props) {
	const {data} = useFetchIssueContext();

	const {number, title, body, url, reactions} = data;
	const selectedReactions = reactions.map(({content}) => content);

	const addReaction = useCallback(() => {}, []);
	const removeReaction = useCallback(() => {}, []);

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
			<Reactions selected={selectedReactions} onAdd={addReaction} onRemove={removeReaction} />
		</Component>
	);
}
