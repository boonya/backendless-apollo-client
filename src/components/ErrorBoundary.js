import PropTypes from 'prop-types';
import {Component} from 'react';
import GeneralError from '@src/components/GeneralError';
import {logError} from '@src/utils/logger';

// eslint-disable-next-line react/require-optimization
export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {hasError: false};
	}

	static getDerivedStateFromError() {
		return {hasError: true};
	}

	componentDidCatch(error, errorInfo) {
		logError(error)(errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback;
		}
		return this.props.children;
	}
}

// eslint-disable-next-line react/static-property-placement
ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
	fallback: PropTypes.node,
};

// eslint-disable-next-line react/static-property-placement
ErrorBoundary.defaultProps = {
	fallback: <GeneralError />,
};
