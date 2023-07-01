import ContextProvider from './ContextProvider';
import useFetch from './useFetch';
import PropTypes from 'prop-types';

export default function Fetch({name, owner, number, children, options}) {
	const result = useFetch({name, owner, number}, options);

	return (
		<ContextProvider {...result}>
			{children}
		</ContextProvider>
	);
}

Fetch.displayName = 'FetchIssue';

Fetch.propTypes = {
	children: PropTypes.node.isRequired,
	name: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired,
	options: PropTypes.shape({}),
	owner: PropTypes.string.isRequired,
};

Fetch.defaultProps = {
	options: undefined,
};
