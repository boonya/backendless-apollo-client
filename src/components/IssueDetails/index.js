import Component from '@src/components/Component';
import GeneralError from '@src/components/GeneralError';
import NotFound from '@src/components/NotFound';
import Progressbar from '@src/components/Progressbar';
import Reactions from '@src/components/Reactions';
import {useFetchIssueContext} from '@src/providers/FetchIssue/ContextProvider';

export default function IssueDetails(props) {
	const {data, loading, error} = useFetchIssueContext();

	if (loading) {
		return <Progressbar {...props} />;
	}

	if (error) {
		return <GeneralError {...props}>Something went wrong</GeneralError>;
	}

	if (!data) {
		return <NotFound {...props} />;
	}

	const {number, title, body, url, reactions} = data;
	const selectedReactions = reactions.map(({content}) => content);

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
			<Reactions selected={selectedReactions} />
		</Component>
	);
}
