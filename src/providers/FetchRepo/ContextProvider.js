import {REPO_SHAPE} from './useFetch';
import PropTypes from 'prop-types';
import {createContext, useContext} from 'react';

const FetchRepoContext = createContext();

export function useFetchRepoContext() {
	return useContext(FetchRepoContext);
}

export default function ContextProvider({children, ...props}) {
	return (
		<FetchRepoContext.Provider value={props}>
			{children}
		</FetchRepoContext.Provider>
	);
}

ContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
	data: PropTypes.shape(REPO_SHAPE),
	error: PropTypes.instanceOf(Error),
	loading: PropTypes.bool,
};

ContextProvider.defaultProps = {
	data: undefined,
	error: undefined,
	loading: false,
};
