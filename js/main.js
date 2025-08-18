// !========== toggle theme  ==========
(function () {
	const root = document.documentElement;
	const storedColor = 'preferred-theme';

	// Load saved theme
	const saved = localStorage.getItem(storedColor);
	if (saved === 'dark' || saved === 'light') {
		root.setAttribute('data-theme', saved);
	}

	// Toggle on click
	document.querySelector('.theme-button-area')?.addEventListener('click', () => {
		const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
		root.setAttribute('data-theme', next);
		localStorage.setItem(storedColor, next);
	});
})();
