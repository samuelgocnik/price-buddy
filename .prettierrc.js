/** @type {import("prettier").Config} */
module.exports = {
	useTabs: true,
	singleQuote: true,
	quoteProps: 'consistent',
	trailingComma: 'none',
	arrowParens: 'avoid',
	endOfLine: 'auto',
	tabWidth: 2,
	plugins: ['prettier-plugin-tailwindcss']
};
