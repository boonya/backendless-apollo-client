import Component from './List';
import {REACTION_CONTENT, REACTIONS} from '@src/constants';

export default {
	component: Component,
	args: {
		reactions: [REACTION_CONTENT.hooray, REACTION_CONTENT.rocket],
		selected: [],
	},
	argTypes: {
		reactions: {
			control: 'inline-check',
			options: REACTIONS,
		},
		selected: {
			control: 'inline-check',
			options: REACTIONS,
		},
	},
};

export function List(args) {
	return <Component {...args} />;
}

export function Interactive(args) {
	return <Component {...args} />;
}
Interactive.argTypes = {
	onClick: {table: {disable: true}},
};
