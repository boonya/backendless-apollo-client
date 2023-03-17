import Meta from './Meta';
import GeneralError from '@src/components/GeneralError';
import Progressbar from '@src/components/Progressbar';
import {useFetchIssuesContext} from '@src/providers/FetchIssues/ContextProvider';
import './index.css';

export default function IssuesList(props) {
	const {data, loading, error} = useFetchIssuesContext();

	if (loading) {
		return <Progressbar {...props} />;
	}

	if (error && !data?.issues) {
		return <GeneralError {...props}>Something went wrong</GeneralError>;
	}

	if (!data.issues.length) {
		return <GeneralError {...props}>No issues found</GeneralError>;
	}

	return (
		<ul
			className="issues"
			aria-label="Issues list"
			{...props}
		>
			{data.issues.map(({id, number, title, createdAt, author}) => (
				<li key={id}>
					#{number} {title}
					{' '}
					<Meta createdAt={createdAt} author={author} />
				</li>
			))}
		</ul>
	);
}
