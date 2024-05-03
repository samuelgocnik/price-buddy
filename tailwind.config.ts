import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				'almond': {
					50: '#fdfbf9', // background
					100: '#f4ebe0',
					200: '#e5d1b8',
					300: '#d9ba98',
					400: '#c9996e',
					500: '#bd8052',
					600: '#b06c46',
					700: '#92573c',
					800: '#764736',
					900: '#603c2e',
					950: '#331e17'
				},

				'blue-smoke': {
					50: '#f5f8f6',
					100: '#e0e7e4',
					200: '#c0cfc9',
					300: '#99afa7',
					400: '#708a81',
					500: '#59736a',
					600: '#465b54',
					700: '#3a4b45', // primary
					800: '#313e3a',
					900: '#2c3533',
					950: '#161d1b' // foreground (text)
				},

				// Define colors for shadcn/ui
				'primary': '#3a4b45',
				'primary-foreground': '#fdfbf9',
				'secondary': '#c9996e',
				'secondary-foreground': '#fdfbf9',
				'destructive': '#b91c1c',
				'destructive-foreground': '#fdfbf9',

				'background': '#fdfbf9',
				'foreground': '#161d1b',
				'border': '#3a4b45',
				'input': '#3a4b45',

				'accent': '#e0e7e4',
				'accent-foreground': '#161d1b',

				'ring': '#3a4b45',

				'popover': '#fdfbf9',
				'popover-foreground': '#161d1b',

				'muted': '#f4ebe0',
				'muted-foreground': '#161d1b',

				'card': '#fdfbf9',
				'card-foreground': '#161d1b'
			},
			borderRadius: {
				radius: '0.5rem'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			}
		}
	},
	plugins: [require('tailwindcss-animate')]
};
export default config;
