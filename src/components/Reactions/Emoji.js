import './Emoji.css';
import PropTypes from 'prop-types';
import {useMemo} from 'react';
import {REACTION_CONTENT, REACTIONS} from '@src/constants';
import {composeClassNames} from '@src/utils/helpers';

export default function Emoji({className, name, ...props}) {
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

	const composedClassName = composeClassNames([
		'emoji',
		className,
	]);

	return (
		<span
			className={composedClassName}
			role="img"
			aria-label={name}
			{...props}
		>
			{icon}
		</span>
	);
}

Emoji.propTypes = {
	className: PropTypes.string,
	name: PropTypes.oneOf(REACTIONS).isRequired,
};

Emoji.defaultProps = {
	className: undefined,
};
