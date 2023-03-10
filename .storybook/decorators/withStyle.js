export default function withStyle() {
	return (Story, {parameters}) => {
		if (!parameters.style) {
			return <Story />;
		}
		return (
			<div style={parameters.style}>
				<Story />
			</div>
		);
	};
}
