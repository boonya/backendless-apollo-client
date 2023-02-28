export default function wrapper(props, Component = 'div') {
	return (Story) => <Component {...props}><Story /></Component>;
}
