import './index.css';
import List from './List';
import Manage from './Manage';
import PropTypes from 'prop-types';
import {REACTIONS} from '@src/constants';

export default function Reactions({selected, onAdd, onRemove, ...props}) {
	return (
		<div className="reactions-container" {...props}>
			<Manage selected={selected} onAdd={onAdd} onRemove={onRemove} />
			<List aria-label="Selected reactions" reactions={selected} />
		</div>
	);
}

Reactions.propTypes = {
	onAdd: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	selected: PropTypes.arrayOf(PropTypes.oneOf(REACTIONS)),
};

Reactions.defaultProps = {
	selected: [],
};
