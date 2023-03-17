import QUERY from './FetchIssue.gql';
import {useQuery} from '@apollo/client';
import pick from 'lodash.pick';
import PropTypes from 'prop-types';
import {ISSUE_STATE, REACTION_CONTENT} from '@src/constants';

export const REACTION_SHAPE = {
	id: PropTypes.string.isRequired,
	content: PropTypes.oneOf(Object.values(REACTION_CONTENT)).isRequired,
};

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
	reactions: PropTypes.arrayOf(PropTypes.shape(REACTION_SHAPE)).isRequired,
	totalReactions: PropTypes.number.isRequired,
};

function extract({data}) {
	const {createdAt, updatedAt, author, reactions, ...rest} = pick(data.repository.issue, Object.keys(ISSUE_SHAPE));

	return {
		...rest,
		createdAt: createdAt && new Date(createdAt),
		updatedAt: updatedAt && new Date(updatedAt),
		author: author.login,
		reactions: reactions.nodes.map((node) => pick(node, Object.keys(REACTION_SHAPE))),
		totalReactions: reactions.totalCount,
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
