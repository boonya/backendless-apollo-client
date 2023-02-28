import ContextProvider from './ContextProvider';
import useFetch from './useFetch';
import PropTypes from 'prop-types';

export default function Me({children}) {
	const result = useFetch();

	return (
		<ContextProvider {...result}>
			{children}
		</ContextProvider>
	);
}

Me.displayName = 'Me.DataProvider';

Me.propTypes = {
	children: PropTypes.node.isRequired,
};
