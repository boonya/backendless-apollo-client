import QUERY from './FetchIssue.gql';
import {useQuery} from '@apollo/client';
import pick from 'lodash.pick';
import PropTypes from 'prop-types';
import {ISSUE_STATES, REACTIONS} from '@src/constants';

export const REACTION_SHAPE = {
	id: PropTypes.string.isRequired,
	content: PropTypes.oneOf(REACTIONS).isRequired,
};

export const ISSUE_SHAPE = {
	id: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	state: PropTypes.oneOf(ISSUE_STATES).isRequired,
	body: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	createdAt: PropTypes.instanceOf(Date).isRequired,
	updatedAt: PropTypes.instanceOf(Date).isRequired,
	author: PropTypes.string.isRequired,
	reactions: PropTypes.arrayOf(PropTypes.shape(REACTION_SHAPE)).isRequired,
	totalReactions: PropTypes.number.isRequired,
};

function extractData(data) {
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
