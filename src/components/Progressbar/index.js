import './index.css';
import {forwardRef} from 'react';

const Progressbar = forwardRef((props, ref) => {
	return (
		<span
			ref={ref}
			role="progressbar"
			aria-label="Please wait"
			className="progressbar"
			{...props}
		>
			Please wait...
		</span>
	);
});

Progressbar.displayName = 'Progressbar';

export default Progressbar;
