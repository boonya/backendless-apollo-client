import './Emoji.css';
import PropTypes from 'prop-types';
import {useMemo} from 'react';
import {REACTION_CONTENT, REACTIONS} from '@src/constants';

export default function Emoji({name, onClick, selected, ...props}) {
	const icon = useMemo(() => {
		switch (name) {
			case REACTION_CONTENT.thumbsUp:
				return <>👍</>;
			case REACTION_CONTENT.thumbsDown:
				return <>👎</>;
			case REACTION_CONTENT.laugh:
				return <>😄</>;
			case REACTION_CONTENT.hooray:
				return <>🎉</>;
			case REACTION_CONTENT.confused:
				return <>😕</>;
			case REACTION_CONTENT.heart:
				return <>❤️</>;
			case REACTION_CONTENT.rocket:
				return <>🚀</>;
			case REACTION_CONTENT.eyes:
				return <>👀</>;
			default:
				return null;
		}
	}, [name]);

	const handleClick = onClick && ((event) => onClick(event, name));
	const role = handleClick ? 'button' : 'img';
	const className = selected ? 'emoji selected' : 'emoji';

	/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
	return (
		<span
			className={className}
			role={role}
			aria-label={name}
			onClick={handleClick}
			{...props}
		>
			{icon}
		</span>
	);
	/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
}

Emoji.propTypes = {
	name: PropTypes.oneOf(REACTIONS).isRequired,
	onClick: PropTypes.func,
	selected: PropTypes.bool,
};

Emoji.defaultProps = {
	onClick: undefined,
	selected: false,
};
