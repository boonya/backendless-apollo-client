import QUERY from './FetchRepo.gql';
import {useQuery} from '@apollo/client';
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

// PropTypes shape to reuse here and in any other places you may need.
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

/**
 * The function in which we normalize the data.
 * We are getting rid of the redundant nesting.
 * Extracting the properties we are interested in only.
 * Translating Date ISO String value to Date object.
 * And so on.
 */
function extractData(data) {
	const {createdAt, languages, licenseInfo, owner, ...rest} = pick(data.repository, Object.keys(REPO_SHAPE));

	return {
		...rest,
		createdAt: createdAt && new Date(createdAt),
		languages: languages?.nodes?.map((node) => pick(node, Object.keys(LANGUAGE_SHAPE))),
		licenseInfo: pick(licenseInfo, Object.keys(LICENSE_SHAPE)),
		owner: pick(owner, Object.keys(OWNER_SHAPE)),
	};
}

/**
 * The function to intercept error in data if there is such.
 */
function extract({data, loading, error}) {
	try {
		return {
			data: data && extractData(data),
			loading,
			error,
		};
	}
	catch (err) {
		return {
			loading,
			error: error || err,
		};
	}
}

export default function useFetch(variables, options) {
	const result = useQuery(QUERY, {variables, ...options});

	return extract(result);
}
