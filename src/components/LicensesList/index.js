import {Link, generatePath} from 'react-router-dom';
import ROUTES from '@src/ROUTES';
import Progressbar from '@src/components/Progressbar';
import {useLicensesContext} from '@src/providers/FetchLicenses/ContextProvider';

export default function LicensesList() {
	const {data, loading, error} = useLicensesContext();

	if (loading) {
		return <Progressbar />;
	}

	if (error) {
		return <h2>Failed to fetch licenses list.</h2>;
	}

	if (!data?.length) {
		return <h2>There is no licenses list.</h2>;
	}

	return (
		<ul aria-label="Licenses">
			{data.map(({id, key, name}) => (
				<li key={id}>
					<Link to={generatePath(ROUTES.license, {key})}>{name}</Link>
				</li>
			))}
		</ul>
	);
}
