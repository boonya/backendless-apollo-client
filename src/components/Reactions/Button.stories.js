import Component from './Button';
import {REACTIONS, REACTION_CONTENT} from '@src/constants';

export default {
	component: Component,
	args: {
		name: REACTION_CONTENT.hooray,
		pending: false,
	},
	argTypes: {
		name: {
			type: 'select',
			options: REACTIONS,
		},
		onAdd: {table: {disable: false}},
		onRemove: {table: {disable: false}},
	},
};

export function Unselected(args) {
	return <Component {...args} />;
}

export function Selected(args) {
	return <Component selected {...args} />;
}
