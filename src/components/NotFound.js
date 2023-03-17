import PropTypes from 'prop-types';
import Component from '@src/components/Component';

export default function NotFound(props) {
	return <Component {...props} />;
}

NotFound.propTypes = {
	children: PropTypes.node,
	component: PropTypes.elementType,
};

NotFound.defaultProps = {
	children: 'Not Found.',
	component: 'h1',
};
