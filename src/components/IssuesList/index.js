import './index.css';
import {generatePath, Link, useParams} from 'react-router-dom';
import ROUTES from '@src/ROUTES';

export default function IssuesList(props) {
	const {name, owner} = useParams();

	const number = 999;
	const title = 'Some issue';

	return (
		<div {...props}>
			Here should be issues list in future
			<Link to={generatePath(ROUTES.issue, {name, owner, number})}>#{number} {title}</Link>
		</div>
	);
}
