import QueryFetchMe from './FetchMe.gql';
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
	const result = pick(data?.viewer, Object.keys(ME_SHAPE));

	if (!result) {
		return null;
	}

	return {
		...result,
		updatedAt: result?.updatedAt && new Date(result.updatedAt),
		createdAt: result?.createdAt && new Date(result.createdAt),
	};
}

export default function useFetch() {
	const state = useQuery(QueryFetchMe);

	return {
		data: state.data && extract(state),
		loading: Boolean(state.loading),
		error: state.error,
	};
}
