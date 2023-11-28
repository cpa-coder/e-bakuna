export function handleThemeChange(darkMode: boolean | undefined) {
	if (typeof document !== 'undefined') {
		document.getElementById('theme-style-light')?.remove();
		document.getElementById('theme-style-dark')?.remove();

		if (darkMode === undefined) {
			document.head.append(
				'<link id="theme-style-light" rel="stylesheet" href="/smui.css" media="(prefers-color-scheme: light)" />\n<link id="theme-style-dark" rel="stylesheet" href="/smui-dark.css" media="screen and (prefers-color-scheme: dark)" />'
			);
		} else if (darkMode) {
			document.head.append(
				'<link id="theme-style-light" rel="stylesheet" href="/smui.css" />\n<link id="theme-style-dark" rel="stylesheet" href="/smui-dark.css" media="screen" />'
			);
		} else {
			document.head.append('<link id="theme-style-light" rel="stylesheet" href="/smui.css" />');
		}
	}
}
