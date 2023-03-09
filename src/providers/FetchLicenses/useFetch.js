import QUERY from './FetchLicenses.gql';
import {useQuery} from '@apollo/client';
import pick from 'lodash.pick';
import PropTypes from 'prop-types';

export const LICENSES_SHAPE = {
	id: PropTypes.string.isRequired,
	key: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

function extract({data}) {
	return data.licenses.map((license) => pick(license, Object.keys(LICENSES_SHAPE)));
}

export default function useFetch() {
	const {data, loading, error} = useQuery(QUERY);

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
