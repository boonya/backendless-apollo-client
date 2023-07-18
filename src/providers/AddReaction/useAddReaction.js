import MUTATION from './AddReaction.gql';
import {useMutation, useApolloClient} from '@apollo/client';
import omit from 'lodash.omit';
import {useCallback} from 'react';

function extract({data, loading, error}) {
	try {
		return {
			data: data && omit(data.addReaction.reaction, ['__typename']),
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

function clearCache(cache, {issueId}) {
	cache.evict({id: `Issue:${issueId}`, fieldName: 'reactions'});
	cache.gc();
}

export default function useAddReaction(options) {
	const {cache} = useApolloClient();
	const [mutation, result] = useMutation(MUTATION, options);

	const add = useCallback(async ({issueId, reaction}) => {
		const response = await mutation({variables: {
			subjectId: issueId,
			content: reaction,
		}});
		const {data} = extract(response);
		clearCache(cache, {issueId});
		return data;
	}, [cache, mutation]);

	return [add, extract(result)];
}
