import {ISSUE_SHAPE} from './useFetch';
import PropTypes from 'prop-types';
import {createContext, useContext} from 'react';
import {PAGE_INFO_SHAPE} from '@src/utils/shapes';

const FetchIssuesContext = createContext();

export function useFetchIssuesContext() {
	return useContext(FetchIssuesContext);
}

export default function ContextProvider({children, ...props}) {
	return (
		<FetchIssuesContext.Provider value={props}>
			{children}
		</FetchIssuesContext.Provider>
	);
}

const DATA_SHAPE = {
	issues: PropTypes.arrayOf(PropTypes.shape(ISSUE_SHAPE)).isRequired,
	pageInfo: PropTypes.shape(PAGE_INFO_SHAPE).isRequired,
	totalCount: PropTypes.number.isRequired,
};

ContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
	data: PropTypes.shape(DATA_SHAPE),
	error: PropTypes.instanceOf(Error),
	loading: PropTypes.bool,
};

ContextProvider.defaultProps = {
	data: undefined,
	error: undefined,
	loading: false,
};
