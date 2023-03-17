import {ME_SHAPE} from './useFetch';
import PropTypes from 'prop-types';
import {createContext} from 'react';
import useSafeContext from '@src/hooks/useSafeContext';

const FetchMeContext = createContext();

export function useFetchMeContext() {
	return useSafeContext(FetchMeContext);
}

export default function ContextProvider({children, ...props}) {
	return (
		<FetchMeContext.Provider value={props}>
			{children}
		</FetchMeContext.Provider>
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
