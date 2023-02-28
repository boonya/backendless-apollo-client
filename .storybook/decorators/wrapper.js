import testWrapper from '@test/decorators/wrapper';

export default function wrapper(...args) {
	const Wrapper = testWrapper(...args);
	return (Story) => <Wrapper><Story /></Wrapper>;
}
