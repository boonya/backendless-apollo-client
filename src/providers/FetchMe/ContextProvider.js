import {ME_SHAPE} from './useFetch';
import PropTypes from 'prop-types';
import {createContext} from 'react';
import useSafeContext from '@src/hooks/useSafeContext';

const MeContext = createContext();

export function useMeContext() {
	return useSafeContext(MeContext);
}

export default function ContextProvider({children, ...props}) {
	return (
		<MeContext.Provider value={props}>
			{children}
		</MeContext.Provider>
	);
}

ContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
	data: PropTypes.shape(ME_SHAPE),
	error: PropTypes.instanceOf(Error),
	loading: PropTypes.bool,
};

ContextProvider.defaultProps = {
	data: undefined,
	error: undefined,
	loading: false,
};
