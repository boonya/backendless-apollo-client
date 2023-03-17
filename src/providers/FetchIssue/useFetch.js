import QUERY from './FetchIssue.gql';
import {useQuery} from '@apollo/client';
import pick from 'lodash.pick';
import PropTypes from 'prop-types';
import {ISSUE_STATE} from '@src/constants';

export const ISSUE_SHAPE = {
	id: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	state: PropTypes.oneOf(Object.values(ISSUE_STATE)).isRequired,
	body: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	createdAt: PropTypes.instanceOf(Date).isRequired,
	updatedAt: PropTypes.instanceOf(Date).isRequired,
	author: PropTypes.string.isRequired,
};

function extract({data}) {
	const {createdAt, updatedAt, author, ...rest} = pick(data.repository.issue, Object.keys(ISSUE_SHAPE));

	return {
		...rest,
		createdAt: createdAt && new Date(createdAt),
		updatedAt: updatedAt && new Date(updatedAt),
		author: author.login,
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
