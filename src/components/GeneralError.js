import PropTypes from 'prop-types';
import Component from '@src/components/Component';

export default function GeneralError(props) {
	return <Component {...props} />;
}

GeneralError.propTypes = {
	children: PropTypes.node,
	component: PropTypes.elementType,
};

GeneralError.defaultProps = {
	children: 'An error occurred.',
	component: 'h1',
};
