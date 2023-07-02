import PropTypes from 'prop-types';
import {forwardRef} from 'react';

const ExtendableComponent = forwardRef(({
	component: C,
	children,
	...props
}, ref) => {
	return <C ref={ref} {...props}>{children}</C>;
});

ExtendableComponent.displayName = 'ExtendableComponent';

export default ExtendableComponent;

ExtendableComponent.propTypes = {
	children: PropTypes.node.isRequired,
	component: PropTypes.elementType,
};

ExtendableComponent.defaultProps = {
	component: 'span',
};
