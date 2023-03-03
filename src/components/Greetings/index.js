import Progressbar from '@src/components/Progressbar';
import {useMe} from '@src/providers/Me/ContextProvider';

export default function Greetings() {
	const {data, loading} = useMe();

	if (loading) {
		return <Progressbar />;
	}

	const name = data?.name || 'Mr(s)';
	return <p>Hello, {name}!</p>;
}
