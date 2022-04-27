module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js}',
		'./node_modules/tw-elements/dist/js/**/*.js',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'
	],

	theme: {
		fontFamily: {
			montserrat: ['Montserrat', 'Regular'],
			mont: ['Montserrat', 'SemiBold']
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: '#ffffff',
			black: '#000000',
			'bg-main': '#DEDFE0',
			'bg-eco': '#F9ECD7',
			'primary-main': '#044E86',
			'primary-eco': '#49590F',
			secondary: '#F6AB33',
			'accent-primary-eco': '#E0CAB0',
			'accent-primary-main': '#00AEEF',
			'accent-secondary-eco': '#712A10',
			'accent-secondary-main': '#30B34A',
			gray: '#575858',

			// Onetime Colors
			'agri-main': '#C4CE7F'
		},
		extend: {
			screens: {
				pc: { raw: '(max-width: 640px)' }
			}
		}
	},
	plugins: [require('tw-elements/dist/plugin')]
};