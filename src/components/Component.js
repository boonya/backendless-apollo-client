import PropTypes from 'prop-types';
import {forwardRef} from 'react';

const Component = forwardRef(({
	component: C,
	children,
	...props
}, ref) => {
	return <C ref={ref} {...props}>{children}</C>;
});

Component.displayName = 'Component';

export default Component;

Component.propTypes = {
	children: PropTypes.node.isRequired,
	component: PropTypes.elementType,
};

Component.defaultProps = {
	component: 'span',
};
