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

function extractData(data) {
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
