import {LICENSES_SHAPE} from './useFetch';
import PropTypes from 'prop-types';
import {createContext} from 'react';
import useSafeContext from '@src/hooks/useSafeContext';

const LicensesContext = createContext();

export function useLicensesContext() {
	return useSafeContext(LicensesContext);
}

export default function ContextProvider({children, ...props}) {
	return (
		<LicensesContext.Provider value={props}>
			{children}
		</LicensesContext.Provider>
	);
}

ContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
	data: PropTypes.arrayOf(PropTypes.shape(LICENSES_SHAPE)),
	error: PropTypes.instanceOf(Error),
	loading: PropTypes.bool,
};

ContextProvider.defaultProps = {
	data: undefined,
	error: undefined,
	loading: false,
};
