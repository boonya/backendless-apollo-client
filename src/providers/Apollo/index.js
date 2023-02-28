import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, from} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import PropTypes from 'prop-types';
import {logError} from '@src/utils/logger';

const httpLink = createHttpLink({
	uri: GITHUB_API_URL,
});

const authLink = setContext((_, {headers}) => {
	const token = GITHUB_API_TOKEN;
	if (!token?.trim()) {
		logError('Auth token:')(`To authenticate requests, please generate a **new personal auth token** from https://github.com/settings/tokens with the following scopes:

    \`\`\`
    repo
      repo:status
      repo_deployment
      public_repo
    admin:org
      read:org
    user[all]
    \`\`\`
    `);
	}
	return {headers: {...headers, authorization: `Bearer ${token}`}};
});

const logErrors = onError(({operation, graphQLErrors, networkError}) => {
	if (graphQLErrors?.length) {
		logError(`GraphQL: "${operation.operationName}" operation has failed.`)(graphQLErrors);
	}
	if (networkError) {
		logError(`Network: "${operation.operationName}" operation has failed.`)(networkError);
	}
});

const client = new ApolloClient({
	link: from([authLink, logErrors, httpLink]),
	connectToDevTools: true,
	cache: new InMemoryCache(),
});

export default function Apollo({children}) {
	return (
		<ApolloProvider client={client}>
			{children}
		</ApolloProvider>
	);
}

Apollo.propTypes = {
	children: PropTypes.node.isRequired,
};
