import {useMe} from '../../providers/Me/ContextProvider';
import Progressbar from '../Progressbar';

export default function Greetings() {
	const {data, loading} = useMe();

	if (loading) {
		return <Progressbar />;
	}

	const name = data?.name || 'Mr(s)';
	return <p>Hello, {name}!</p>;
}
