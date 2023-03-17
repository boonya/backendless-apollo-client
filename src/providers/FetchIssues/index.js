import ContextProvider from './ContextProvider';
import useFetch from './useFetch';
import PropTypes from 'prop-types';

export default function FetchIssues({name, owner, first, options, children}) {
	const result = useFetch({name, owner, first}, options);

	return (
		<ContextProvider {...result}>
			{children}
		</ContextProvider>
	);
}

FetchIssues.propTypes = {
	children: PropTypes.node.isRequired,
	first: PropTypes.number,
	name: PropTypes.string.isRequired,
	options: PropTypes.shape({}),
	owner: PropTypes.string.isRequired,
};

FetchIssues.defaultProps = {
	first: undefined,
	options: undefined,
};
