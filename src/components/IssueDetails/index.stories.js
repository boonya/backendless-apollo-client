import Component from '.';
import wrapper from '@sb/decorators/wrapper';
import {mutation} from '@sb/msw';
import ADD_REACTION_MUTATION from '@src/providers/AddReaction/AddReaction.gql';
import ADD_REACTION_RESPONSE from '@src/providers/AddReaction/__response__/sample.json';
import FetchIssueContextProvider from '@src/providers/FetchIssue/ContextProvider';
import ISSUE_DATA from '@src/providers/FetchIssue/__data__/sample';
import REMOVE_REACTION_MUTATION from '@src/providers/RemoveReaction/RemoveReaction.gql';
import REMOVE_REACTION_RESPONSE from '@src/providers/RemoveReaction/__response__/sample.json';

export default {
	component: Component,
	parameters: {msw: {handlers: {
		ADD_REACTION_MUTATION: mutation(ADD_REACTION_MUTATION, ADD_REACTION_RESPONSE),
		REMOVE_REACTION_MUTATION: mutation(REMOVE_REACTION_MUTATION, REMOVE_REACTION_RESPONSE),
	}}},
};

export function IssueDetails(args) {
	return <Component {...args} />;
}
IssueDetails.decorators = [
	wrapper(ISSUE_DATA, FetchIssueContextProvider),
];

export function AddReactionFail(args) {
	return <Component {...args} />;
}
AddReactionFail.decorators = [
	wrapper(ISSUE_DATA, FetchIssueContextProvider),
];
AddReactionFail.parameters = {msw: {handlers: {
	ADD_REACTION_MUTATION: mutation(ADD_REACTION_MUTATION, {errors: [{message: 'Failed to add reaction.'}]}),
}}};

export function RemoveReactionFail(args) {
	return <Component {...args} />;
}
RemoveReactionFail.decorators = [
	wrapper(ISSUE_DATA, FetchIssueContextProvider),
];
RemoveReactionFail.parameters = {msw: {handlers: {
	REMOVE_REACTION_MUTATION: mutation(REMOVE_REACTION_MUTATION, {errors: [{message: 'Failed to remove reaction.'}]}),
}}};
