import ApolloProvider from '@src/providers/Apollo';

const ApolloClientProps = {
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'no-cache',
			errorPolicy: 'all',
		},
		query: {
			fetchPolicy: 'no-cache',
			errorPolicy: 'all',
		},
	},
};

export default function withApollo() {
	return (Story) => (
		<ApolloProvider ApolloClientProps={ApolloClientProps}>
			<Story />
		</ApolloProvider>
	);
}
