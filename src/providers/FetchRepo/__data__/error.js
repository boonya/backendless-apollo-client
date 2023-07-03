import RESPONSE from '../__response__/error.json';
import {makeApolloError} from '@test/helpers';

export default {
	error: makeApolloError(RESPONSE.errors),
};
