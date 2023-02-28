import PropTypes from 'prop-types';

export default function DecoratorsReducer({children, decorators}) {
	function reducer(inner, Outer) {
		if (Outer) {
			return <Outer>{inner}</Outer>;
		}
		return inner;
	}
	return decorators.reduce(reducer, children);
}

DecoratorsReducer.propTypes = {
	children: PropTypes.node.isRequired,
	decorators: PropTypes.arrayOf(PropTypes.elementType).isRequired,
};
