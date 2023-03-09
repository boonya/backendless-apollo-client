import Greetings from '.';
import {within} from '@storybook/testing-library';
import wrapper from '@sb/decorators/wrapper';
import MeContextProvider from '@src/providers/FetchMe/ContextProvider';
import ERROR_DATA from '@src/providers/FetchMe/__data__/ValidationError';
import SUCCESSFUL_DATA from '@src/providers/FetchMe/__data__/success';

export default {component: Greetings};

export function ShowName() {
	return <Greetings />;
}
ShowName.decorators = [
	wrapper(SUCCESSFUL_DATA, MeContextProvider),
];
ShowName.play = async ({canvasElement}) => {
	const screen = within(canvasElement);
	screen.getByText('Hello, Dude Dudovich!');
};

export function Loading() {
	return <Greetings />;
}
Loading.decorators = [
	wrapper({loading: true}, MeContextProvider),
];
Loading.play = async ({canvasElement}) => {
	const screen = within(canvasElement);
	screen.getByRole('progressbar', {name: 'Please wait'});
};

export function ShowFallbackName() {
	return <Greetings />;
}
ShowFallbackName.decorators = [
	wrapper(ERROR_DATA, MeContextProvider),
];
ShowFallbackName.play = async ({canvasElement}) => {
	const screen = within(canvasElement);
	screen.getByText('Hello, Mr(s)!');
};
