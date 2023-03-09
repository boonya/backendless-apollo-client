import ContextProvider from './ContextProvider';
import useFetch from './useFetch';
import PropTypes from 'prop-types';

export default function FetchLicenses({children}) {
	const result = useFetch();

	return (
		<ContextProvider {...result}>
			{children}
		</ContextProvider>
	);
}

FetchLicenses.propTypes = {
	children: PropTypes.node.isRequired,
};
