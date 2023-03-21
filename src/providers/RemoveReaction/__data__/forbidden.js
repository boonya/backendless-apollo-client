import RESPONSE from '../__response__/forbidden.json';
import {makeApolloError} from '@test/helpers';

export default {
	error: makeApolloError(RESPONSE.errors),
};
