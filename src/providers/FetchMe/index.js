import ContextProvider from './ContextProvider';
import useFetch from './useFetch';
import PropTypes from 'prop-types';

export default function FetchMe({children}) {
	const result = useFetch();

	return (
		<ContextProvider {...result}>
			{children}
		</ContextProvider>
	);
}

FetchMe.propTypes = {
	children: PropTypes.node.isRequired,
};
