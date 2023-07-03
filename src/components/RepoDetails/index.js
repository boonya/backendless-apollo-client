import PropTypes from 'prop-types';
import ExtendableComponent from '@src/components/ExtendableComponent';

export default function RepoDetails(props) {
	return <ExtendableComponent {...props}>Repo details</ExtendableComponent>;
}

RepoDetails.propTypes = {
	component: PropTypes.elementType,
};

RepoDetails.defaultProps = {
	component: 'section',
};
