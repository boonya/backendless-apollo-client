import ContextProvider from './ContextProvider';
import useFetch from './useFetch';
import PropTypes from 'prop-types';

export default function FetchRepo({name, owner, languages, options, children}) {
	const result = useFetch({name, owner, languages}, options);

	return (
		<ContextProvider {...result}>
			{children}
		</ContextProvider>
	);
}

FetchRepo.propTypes = {
	children: PropTypes.node.isRequired,
	languages: PropTypes.number,
	name: PropTypes.string.isRequired,
	options: PropTypes.shape({}),
	owner: PropTypes.string.isRequired,
};

FetchRepo.defaultProps = {
	languages: undefined,
	options: undefined,
};
