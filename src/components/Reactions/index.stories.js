import Component from '.';
import {REACTION_CONTENT, REACTIONS} from '@src/constants';

export default {
	component: Component,
	args: {
		selected: [REACTION_CONTENT.hooray, REACTION_CONTENT.rocket],
		pending: [],
	},
	argTypes: {
		selected: {
			control: 'inline-check',
			options: REACTIONS,
		},
		pending: {
			control: 'inline-check',
			options: REACTIONS,
		},
		onAdd: {table: {disable: false}},
		onRemove: {table: {disable: false}},
	},
};

export function Reactions(args) {
	return <Component {...args} />;
}
