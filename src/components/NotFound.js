import PropTypes from 'prop-types';
import ExtendableComponent from '@src/components/ExtendableComponent';

export default function NotFound(props) {
	return <ExtendableComponent {...props} />;
}

NotFound.propTypes = {
	children: PropTypes.node,
	component: PropTypes.elementType,
};

NotFound.defaultProps = {
	children: 'Not Found.',
	component: 'h1',
};
