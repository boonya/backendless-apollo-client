import './index.css';
import PropTypes from 'prop-types';

export default function Theme({children}) {
	return children;
}

Theme.propTypes = {
	children: PropTypes.node.isRequired,
};
