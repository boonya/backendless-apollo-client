import PropTypes from 'prop-types';
import ExtendableComponent from '@src/components/ExtendableComponent';

export default function GeneralError(props) {
	return <ExtendableComponent {...props} />;
}

GeneralError.propTypes = {
	children: PropTypes.node,
	component: PropTypes.elementType,
};

GeneralError.defaultProps = {
	children: 'An error occurred.',
	component: 'h1',
};
