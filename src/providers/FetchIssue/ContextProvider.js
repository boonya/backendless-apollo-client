import {ISSUE_SHAPE} from './useFetch';
import PropTypes from 'prop-types';
import {createContext, useContext} from 'react';

const FetchIssueContext = createContext();

export function useFetchIssueContext() {
	return useContext(FetchIssueContext);
}

export default function ContextProvider({children, ...props}) {
	return (
		<FetchIssueContext.Provider value={props}>
			{children}
		</FetchIssueContext.Provider>
	);
}

ContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
	data: PropTypes.shape(ISSUE_SHAPE),
	error: PropTypes.instanceOf(Error),
	loading: PropTypes.bool,
};

ContextProvider.defaultProps = {
	data: undefined,
	error: undefined,
	loading: false,
};
