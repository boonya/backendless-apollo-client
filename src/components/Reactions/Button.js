import Emoji from './Emoji';
import './Button.css';
import PropTypes from 'prop-types';
import {useCallback} from 'react';
import {composeClassNames} from '@src/utils/helpers';

export default function Button({name, onAdd, onRemove, selected, pending, className, ...props}) {
	const handleClick = useCallback(() => {
		if (selected) {
			onRemove(name);
		}
		else {
			onAdd(name);
		}
	}, [selected, onRemove, name, onAdd]);

	const composedClassName = composeClassNames([
		'emoji-button',
		selected && 'selected',
		pending && 'pending',
		className,
	]);

	return (
		<button
			type="button"
			aria-label={name}
			onClick={handleClick}
			className={composedClassName}
			disabled={pending}
			aria-pressed={selected}
		>
			<Emoji name={name} {...props} />
		</button>
	);
}

Button.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	onAdd: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	pending: PropTypes.bool,
	selected: PropTypes.bool,
};

Button.defaultProps = {
	className: undefined,
	pending: false,
	selected: false,
};
