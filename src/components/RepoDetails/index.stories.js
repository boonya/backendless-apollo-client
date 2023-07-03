import Component from '.';
import wrapper from '@sb/decorators/wrapper';
import FetchRepoContextProvider from '@src/providers/FetchRepo/ContextProvider';
import ERROR from '@src/providers/FetchRepo/__data__/error';
import HALF_ERROR from '@src/providers/FetchRepo/__data__/half-error';
import DATA from '@src/providers/FetchRepo/__data__/sample';

export default {component: Component};

export function RepoDetails(args) {
	return <Component {...args} />;
}
RepoDetails.decorators = [
	wrapper(DATA, FetchRepoContextProvider),
];

export function Loading(args) {
	return <Component {...args} />;
}
Loading.decorators = [
	wrapper({loading: true}, FetchRepoContextProvider),
];

export function Error(args) {
	return <Component {...args} />;
}
Error.decorators = [
	wrapper(ERROR, FetchRepoContextProvider),
];

export function HalfError(args) {
	return <Component {...args} />;
}
HalfError.decorators = [
	wrapper(HALF_ERROR, FetchRepoContextProvider),
];
