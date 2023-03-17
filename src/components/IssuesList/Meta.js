import PropTypes from 'prop-types';

export default function Meta({createdAt, author, ...props}) {
	return (
		<span {...props}>
			Created at
			{' '}
			<time dateTime={createdAt.toISOString()}>{createdAt.toLocaleString()}</time>
			{' '}
			by {author}
		</span>
	);
}

Meta.propTypes = {
	author: PropTypes.string.isRequired,
	createdAt: PropTypes.instanceOf(Date).isRequired,
};
