import PropTypes from 'prop-types';
import Progressbar from '@src/components/Progressbar';
import {useMeContext} from '@src/providers/FetchMe/ContextProvider';

export default function Greetings({component: Tag}) {
	const {data, loading} = useMeContext();

	if (loading) {
		return <Progressbar />;
	}

	const name = data?.name || 'Mr(s)';
	return <Tag>Hello, {name}!</Tag>;
}

Greetings.propTypes = {
	component: PropTypes.elementType,
};

Greetings.defaultProps = {
	component: 'p',
};
