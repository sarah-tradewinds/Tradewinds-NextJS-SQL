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
			mont: ['Montserrat', 'SemiBold'],
			inter: ['Inter']
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: '#ffffff',
			black: '#000000',
			'bg-main': '#F5F5F5',
			'bg-eco': '#F9ECD7',
			'primary-main': '#044E86',
			'primary-eco': '#49590F',

			error: '#f23030',
			price_red: '#EF5151',
			success: '#166b22',
			secondary: '#F6AB33',
			'accent-primary-eco': '#E0CAB0',
			'accent-primary-main': '#00AEEF',
			'accent-secondary-eco': '#712A10',
			'accent-secondary-main': '#30B34A',
			'accent-error': '#f23030',
			button_blue: '#32A9E0',
			label_gray: '#C4C4C4',
			'accent-success': '#166b22',
			light_yellow: '#EEAD20',
			gray: '#575858',
			border: '#DCDBDB',
			dark_brown: '#712A10',
			bg_input: '#fffbfb',
			beauty: '#E1DDDD',
			dark_gray: '#69738C',
			bg_light_gray: '#DEDFE0',
			light_gray: '#E2DED9',
			bg_gray: '#D9D9D9',
			bg_light_pink: '#EBDEDA',
			bg_blue: '#00B2C7',
			bg_light_blue: '#BBD3DD',
			bg_gray_medium: '#93A799',
			light_green: '#37B34A',
			green: '#35B34A',
			cyan: '#33A7DF',

			// Onetime Colors
			'agri-main': '#C4CE7F',
			'header-bar': '#EDD3A9'
		},
		container: {
			center: true
		},
		extend: {
			screens: {
				pc: { raw: '(max-width: 640px)' },
				mobile: '320px',
				tablet: '744px',
				'840px': '840px',
				'900px': '900px',
				'980px': '980px',
				desktop: '1512px',
				'3xl': '1700px'
			},
			boxShadow: {
				'mega-menu': '2px 0px 4px rgba(0, 0, 0, 0.25)'
			}
		}
	},
	plugins: [require('@tailwindcss/line-clamp')]
};
