import './List.css';
import Button from './Button';
import PropTypes from 'prop-types';
import {REACTIONS} from '@src/constants';

export default function List({onAdd, onRemove, selected, pending, ...props}) {
	return (
		<ul aria-label="Reactions" className="reactions" {...props}>
			{REACTIONS.map((name) => (
				<li key={name}>
					<Button
						name={name}
						onAdd={onAdd}
						onRemove={onRemove}
						selected={selected.includes(name)}
						pending={pending.includes(name)}
					/>
				</li>
			))}
		</ul>
	);
}

List.propTypes = {
	onAdd: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	pending: PropTypes.arrayOf(PropTypes.oneOf(REACTIONS)),
	selected: PropTypes.arrayOf(PropTypes.oneOf(REACTIONS)),
};

List.defaultProps = {
	pending: [],
	selected: [],
};
