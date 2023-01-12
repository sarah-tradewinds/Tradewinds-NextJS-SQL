const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./src/**/*.{js,ts,jsx,tsx}'
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
			error: '#f23030',
			success: '#166b22',
			secondary: '#F6AB33',
			'accent-primary-eco': '#E0CAB0',
			'accent-primary-main': '#00AEEF',
			'accent-secondary-eco': '#712A10',
			'accent-secondary-main': '#30B34A',
			'accent-error': '#f23030',
			'accent-success': '#166b22',
			gray: '#575858',
			green: '#37B34A',
			cyan: '#33A7DF',

			// Onetime Colors
			'agri-main': '#C4CE7F'
		},
		screens: {
			sm: '640px',
			// md: '768px',
			// lg: '1024px',
			md: '744px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
			'4k': '2560px',
			mobile: '320px',
			tablet: '744px',
			desktop: '1512px'
		},
		container: {
			screens: {
				'2xl': '1512px',
				'4k': '1512px'
			}
		},
		extend: {
			screens: {
				pc: { raw: '(max-width: 640px)' }
			},
			boxShadow: {
				'mega-menu': '2px 0px 4px rgba(0, 0, 0, 0.25)'
			}
		}
	}
};
