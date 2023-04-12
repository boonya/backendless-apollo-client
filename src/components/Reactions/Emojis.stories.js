import Component from './Emoji';
import {REACTIONS} from '@src/constants';

export default {component: Component};

export function Emojis(args) {
	return (
		<ul>
			{REACTIONS.map((name) => (
				<li key={name}>
					{name} : <Component name={name} {...args} />
				</li>
			))}
		</ul>
	);
}
