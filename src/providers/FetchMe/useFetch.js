import QUERY from './FetchMe.gql';
import {useQuery} from '@apollo/client';
import pick from 'lodash.pick';
import PropTypes from 'prop-types';

export const ME_SHAPE = {
	login: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	avatarUrl: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	websiteUrl: PropTypes.string.isRequired,
	updatedAt: PropTypes.instanceOf(Date).isRequired,
	createdAt: PropTypes.instanceOf(Date).isRequired,
};

function extract({data}) {
	const {updatedAt, createdAt, ...rest} = pick(data.viewer, Object.keys(ME_SHAPE));

	return {
		...rest,
		updatedAt: updatedAt && new Date(updatedAt),
		createdAt: createdAt && new Date(createdAt),
	};
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
