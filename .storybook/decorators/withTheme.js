import ThemeProvider from '@src/providers/Theme';

const COLOR_SCHEME = {
	light: 'light',
	dark: 'dark',
};

export function getThemeToolbar() {
	return {
		name: 'Theme',
		defaultValue: window.matchMedia('(prefers-color-scheme: dark)').matches
			? COLOR_SCHEME.dark
			: COLOR_SCHEME.light,
		toolbar: {
			icon: 'eye',
			items: Object.values(COLOR_SCHEME).map((value) => ({value, title: value})),
		},
	};
}

export default function withTheme() {
	return (Story, {globals}) => {
		const css = getComputedStyle(document.documentElement);

		const currentBackgroundColor = css.getPropertyValue('--background-color');

		const lightBackgroundColor = css.getPropertyValue('--light-background-color');
		const lightTextColor = css.getPropertyValue('--light-text-color');
		const lightLinkColor = css.getPropertyValue('--light-link-color');

		const darkBackgroundColor = css.getPropertyValue('--dark-background-color');
		const darkTextColor = css.getPropertyValue('--dark-text-color');
		const darkLinkColor = css.getPropertyValue('--dark-link-color');

		if (globals.theme === COLOR_SCHEME.light && currentBackgroundColor !== lightBackgroundColor) {
			document.documentElement.style.setProperty('--background-color', lightBackgroundColor);
			document.documentElement.style.setProperty('--text-color', lightTextColor);
			document.documentElement.style.setProperty('--link-color', lightLinkColor);
		}
		else if (globals.theme === COLOR_SCHEME.dark && currentBackgroundColor !== darkBackgroundColor) {
			document.documentElement.style.setProperty('--background-color', darkBackgroundColor);
			document.documentElement.style.setProperty('--text-color', darkTextColor);
			document.documentElement.style.setProperty('--link-color', darkLinkColor);
		}

		return (
			<ThemeProvider>
				<Story />
			</ThemeProvider>
		);
	};
}
