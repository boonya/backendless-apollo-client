import QUERY from './FetchRepo.gql';
import {useQuery} from '@apollo/client';
import omit from 'lodash.omit';
import pick from 'lodash.pick';
import PropTypes from 'prop-types';

const LANGUAGE_SHAPE = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
};

const LICENSE_SHAPE = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};

const OWNER_SHAPE = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	avatarUrl: PropTypes.string.isRequired,
};

export const REPO_SHAPE = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	homepageUrl: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	descriptionHTML: PropTypes.string.isRequired,
	createdAt: PropTypes.instanceOf(Date).isRequired,
	languages: PropTypes.arrayOf(PropTypes.shape(LANGUAGE_SHAPE)).isRequired,
	licenseInfo: PropTypes.shape(LICENSE_SHAPE).isRequired,
	owner: PropTypes.shape(OWNER_SHAPE).isRequired,
};

function extract({data}) {
	const {createdAt, languages, licenseInfo, owner, ...rest} = pick(data.repository, Object.keys(REPO_SHAPE));

	return {
		...rest,
		createdAt: createdAt && new Date(createdAt),
		languages: languages?.nodes?.map(({id, name, color}) => ({id, name, color})),
		licenseInfo: omit(licenseInfo, ['__typename']),
		owner: omit(owner, ['__typename']),
	};
}

export default function useFetch(variables, options) {
	const {data, loading, error} = useQuery(QUERY, {variables, ...options});

	try {
		return {
			data: data && extract({data}),
			loading,
			error,
		};
	}
	catch (cause) {
		return {
			loading,
			error: cause,
		};
	}
}
