import Component from '.';
import {REACTIONS, REACTION_CONTENT} from '@src/constants';

export default {
	component: Component,
	args: {
		selected: [REACTION_CONTENT.hooray, REACTION_CONTENT.rocket],
	},
	argTypes: {
		selected: {
			control: 'inline-check',
			options: REACTIONS,
		},
		onAdd: {table: {disable: true}},
		onRemove: {table: {disable: true}},
	},
};

export function Reactions(args) {
	return <Component {...args} />;
}
