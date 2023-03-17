import './List.css';
import Emoji from './Emoji';
import PropTypes from 'prop-types';
import {REACTIONS} from '@src/constants';

export default function List({reactions, onClick, selected, ...props}) {
	if (!reactions?.length) {
		return null;
	}

	return (
		<ul aria-label="Reactions" className="reactions" {...props}>
			{reactions.map((name) => (
				<li key={name} aria-label={name}>
					<Emoji
						onClick={onClick}
						name={name}
						selected={selected.includes(name)}
					/>
				</li>
			))}
		</ul>
	);
}

List.propTypes = {
	onClick: PropTypes.func,
	reactions: PropTypes.arrayOf(PropTypes.oneOf(REACTIONS)).isRequired,
	selected: PropTypes.arrayOf(PropTypes.oneOf(REACTIONS)),
};

List.defaultProps = {
	onClick: undefined,
	selected: [],
};
