import Component from '.';
import wrapper from '@sb/decorators/wrapper';
import LicensesContextProvider from '@src/providers/FetchLicenses/ContextProvider';
import SUCCESSFUL_DATA from '@src/providers/FetchLicenses/__data__/sample.json';

export default {component: Component};

export function LicensesList() {
	return <Component />;
}
LicensesList.decorators = [
	wrapper(SUCCESSFUL_DATA, LicensesContextProvider),
];

export function Empty() {
	return <Component />;
}
Empty.decorators = [
	wrapper({}, LicensesContextProvider),
];

export function Loading() {
	return <Component />;
}
Loading.decorators = [
	wrapper({loading: true}, LicensesContextProvider),
];

export function Failed() {
	return <Component />;
}
Failed.decorators = [
	wrapper({error: new Error('Test error')}, LicensesContextProvider),
];
