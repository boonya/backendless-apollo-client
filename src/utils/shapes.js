import PropTypes from 'prop-types';

export const PAGE_INFO_SHAPE = {
	endCursor: PropTypes.string,
	hasNextPage: PropTypes.bool.isRequired,
	hasPreviousPage: PropTypes.bool.isRequired,
	startCursor: PropTypes.string,
};
