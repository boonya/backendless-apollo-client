import PropTypes from 'prop-types';
import './common.css';

export default function Theme({children}) {
	return children;
}

Theme.propTypes = {
	children: PropTypes.node.isRequired,
};
