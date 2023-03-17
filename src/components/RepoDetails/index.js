import PropTypes from 'prop-types';
import Component from '@src/components/Component';
import GeneralError from '@src/components/GeneralError';
import Progressbar from '@src/components/Progressbar';
import {useFetchRepoContext} from '@src/providers/FetchRepo/ContextProvider';

export default function RepoDetails({component, ...props}) {
	const {data, loading, error} = useFetchRepoContext();

	if (loading) {
		return <Progressbar {...props} />;
	}

	if (error && !data) {
		return <GeneralError {...props}>Something went wrong</GeneralError>;
	}

	if (!data) {
		return <GeneralError {...props}>No data</GeneralError>;
	}

	const {name, description, languages, createdAt, licenseInfo} = data;
	return (
		<Component
			component={component}
			aria-labelledby="region-label"
			aria-describedby="region-description"
			{...props}
		>
			<h1 id="region-label">{name}</h1>
			<h2 id="region-description">{description}</h2>
			{languages?.length && (
				<div>
					<p id="languages-label">Languages</p>
					<ul aria-labelledby="languages-label">
						{languages.map((lang) => <li key={lang.id}>{lang.name}</li>)}
					</ul>
				</div>
			)}
			<p id="created-at">
				Created at
				{' '}
				<time
					aria-labelledby="created-at"
					dateTime={createdAt.toISOString()}
				>
					{createdAt.toLocaleString()}
				</time>
			</p>
			<p><a href={licenseInfo.url} target="_blank" rel="noreferrer">{licenseInfo.name}</a></p>
		</Component>
	);
}

RepoDetails.propTypes = {
	component: PropTypes.elementType,
};

RepoDetails.defaultProps = {
	component: 'section',
};
