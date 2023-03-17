import Emoji from './Emoji';
import {action} from '@storybook/addon-actions';
import {REACTIONS} from '@src/constants';

export default {
	component: Emoji,
	args: {
		interactive: false,
		selected: false,
	},
};

export function Emojis({interactive, ...args}) {
	const onClick = interactive ? action('onClick') : undefined;
	return (
		<ul>
			{REACTIONS.map((name) => (
				<li key={name}>
					<Emoji name={name} onClick={onClick} {...args} /> {name}
				</li>
			))}
		</ul>
	);
}
