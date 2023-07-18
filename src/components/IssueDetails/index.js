import Container from './Container';
import GeneralError from '@src/components/GeneralError';
import NotFound from '@src/components/NotFound';
import Progressbar from '@src/components/Progressbar';
import {useFetchIssueContext} from '@src/providers/FetchIssue/ContextProvider';

export default function IssueDetails(props) {
	const {data, loading, error} = useFetchIssueContext();

	if (loading) {
		return <Progressbar {...props} />;
	}

	if (error) {
		return <GeneralError {...props}>Something went wrong</GeneralError>;
	}

	if (!data) {
		return <NotFound {...props} />;
	}

	return <Container {...props} />;
}
