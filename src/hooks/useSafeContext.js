import {useContext} from 'react';

export default function useSafeContext(context) {
	const values = useContext(context);
	if (values) {
		return values;
	}
	throw new Error('The hook must be used within it\'s context provider.');
}
