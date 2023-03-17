import QUERY from './FetchIssues.gql';
import {useQuery} from '@apollo/client';
import pick from 'lodash.pick';
import PropTypes from 'prop-types';
import {PAGE_INFO_SHAPE} from '@src/utils/shapes';

export const ISSUE_SHAPE = {
	id: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	createdAt: PropTypes.instanceOf(Date).isRequired,
};

function extract({data}) {
	const {nodes, pageInfo, totalCount} = data.repository.issues;
	const issues = nodes.map((node) => {
		const {author, createdAt, ...rest} = pick(node, Object.keys(ISSUE_SHAPE));
		return {
			...rest,
			author: author.login,
			createdAt: createdAt && new Date(createdAt),
		};
	});
	return {
		issues,
		pageInfo: pick(pageInfo, Object.keys(PAGE_INFO_SHAPE)),
		totalCount,
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
