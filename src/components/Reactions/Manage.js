import './Manage.css';
import List from './List';
import PropTypes from 'prop-types';
import {useCallback} from 'react';
import {REACTIONS} from '@src/constants';

/* eslint-disable max-len */
export default function Manage({selected, onAdd, onRemove, ...props}) {
	const onClick = useCallback((_, name) => {
		if (selected.includes(name)) {
			onRemove(name);
		}
		else {
			onAdd(name);
		}
	}, [onAdd, onRemove, selected]);

	return (
		<details className="manage-reactions" aria-label="Add or remove reactions" {...props}>
			<summary aria-haspopup="true" data-view-component="true" >
				<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1">
					<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm3.82 1.636a.75.75 0 0 1 1.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 0 1 1.222.87l-.022-.015c.02.013.021.015.021.015v.001l-.001.002-.002.003-.005.007-.014.019a2.066 2.066 0 0 1-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.331 3.331 0 0 1-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 0 1 .183-1.044ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5.25 2.25.592.416a97.71 97.71 0 0 0-.592-.416Z" />
				</svg>
			</summary>
			<List
				aria-label="Available reactions"
				reactions={REACTIONS}
				onClick={onClick}
				selected={selected}
			/>
		</details>
	);
}

Manage.propTypes = {
	onAdd: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	selected: PropTypes.arrayOf(PropTypes.oneOf(REACTIONS)),
};

Manage.defaultProps = {
	selected: [],
};
/* eslint-enable max-len */
