import Component from '@src/components/Component';
import Reactions from '@src/components/Reactions/Container';
import {useFetchIssueContext} from '@src/providers/FetchIssue/ContextProvider';

export default function Container(props) {
	const {data} = useFetchIssueContext();

	const {number, title, body, url} = data;

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
			<Reactions />
		</Component>
	);
}
