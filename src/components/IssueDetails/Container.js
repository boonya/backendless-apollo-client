import Component from '@src/components/Component';
import Reactions from '@src/components/Reactions';
import {useFetchIssueContext} from '@src/providers/FetchIssue/ContextProvider';

export default function Container(props) {
	const {data} = useFetchIssueContext();

	const {number, title, body, url} = data;

	const labelledBy = 'region-label';
	const describedBy = 'region-description';

	return (
		<Component
			component="section"
			aria-labelledby={labelledBy}
			aria-describedby={body && describedBy}
			{...props}
		>
			<h1 id={labelledBy}>
				<a href={url} target="_blank" rel="noreferrer">[#{number}] {title}</a>
			</h1>
			{body && <h2 id={describedBy}>{body}</h2>}
			<Reactions />
		</Component>
	);
}
