import ContextProvider from './ContextProvider';
import useFetch from './useFetch';
import PropTypes from 'prop-types';

export default function Fetch({name, owner, first, options, children}) {
	const result = useFetch({name, owner, first}, options);

	return (
		<ContextProvider {...result}>
			{children}
		</ContextProvider>
	);
}

Fetch.displayName = 'FetchIssues';

Fetch.propTypes = {
	children: PropTypes.node.isRequired,
	first: PropTypes.number,
	name: PropTypes.string.isRequired,
	options: PropTypes.shape({}),
	owner: PropTypes.string.isRequired,
};

Fetch.defaultProps = {
	first: undefined,
	options: undefined,
};
