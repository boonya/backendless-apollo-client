import './index.css';
import Meta from './Meta';
import {generatePath, Link, useParams} from 'react-router-dom';
import ROUTES from '@src/ROUTES';
import GeneralError from '@src/components/GeneralError';
import Progressbar from '@src/components/Progressbar';
import {useFetchIssuesContext} from '@src/providers/FetchIssues/ContextProvider';

export default function IssuesList(props) {
	const {name, owner} = useParams();
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
					<Link to={generatePath(ROUTES.issue, {name, owner, number})}>#{number} {title}</Link>
					{' '}
					<Meta createdAt={createdAt} author={author} />
				</li>
			))}
		</ul>
	);
}
