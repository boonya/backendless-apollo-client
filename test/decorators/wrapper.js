export default function wrapper(props, Component = 'div') {
	return ({children}) => <Component {...props}>{children}</Component>;
}
