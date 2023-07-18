import Component from '.';
import wrapper from '@sb/decorators/wrapper';
import FetchIssueContextProvider from '@src/providers/FetchIssue/ContextProvider';
import ISSUE_DATA from '@src/providers/FetchIssue/__data__/sample';

export default {
	component: Component,
};

export function IssueDetails(args) {
	return <Component {...args} />;
}
IssueDetails.decorators = [
	wrapper(ISSUE_DATA, FetchIssueContextProvider),
];
