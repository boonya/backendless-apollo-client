import PropTypes from 'prop-types';
import Progressbar from '@src/components/Progressbar';
import {useFetchMeContext} from '@src/providers/FetchMe/ContextProvider';

export default function Greetings({component: Component}) {
	const {data, loading} = useFetchMeContext();

	if (loading) {
		return <Progressbar />;
	}

	const name = data?.name || 'Mr(s)';
	return <Component>Hello, {name}!</Component>;
}

Greetings.propTypes = {
	component: PropTypes.elementType,
};

Greetings.defaultProps = {
	component: 'p',
};
