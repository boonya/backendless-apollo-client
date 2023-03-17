import ContextProvider from './ContextProvider';
import useFetch from './useFetch';
import PropTypes from 'prop-types';

export default function FetchIssue({name, owner, number, children, options}) {
	const result = useFetch({name, owner, number}, options);

	return (
		<ContextProvider {...result}>
			{children}
		</ContextProvider>
	);
}

FetchIssue.propTypes = {
	children: PropTypes.node.isRequired,
	name: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired,
	options: PropTypes.shape({}),
	owner: PropTypes.string.isRequired,
};

FetchIssue.defaultProps = {
	options: undefined,
};
