import Progressbar from '@src/components/Progressbar';
import {useMeContext} from '@src/providers/FetchMe/ContextProvider';

export default function Greetings() {
	const {data, loading} = useMeContext();

	if (loading) {
		return <Progressbar />;
	}

	const name = data?.name || 'Mr(s)';
	return <p>Hello, {name}!</p>;
}
