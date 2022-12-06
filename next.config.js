const { PHASE_DEVELOPMENT_SERVER } = require('next/constants.js');

// Third party packages
const { i18n } = require('./next-i18next.config.js');

const nextConfig = (phase) => {
	/* development only config options here */
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return {
			i18n,
			reactStrictMode: true,
			env: {
				SITE_URL: 'http://localhost:3000',
				BUYER_DASHBOARD_SITE_URL:
					'https://tradewinds-dev-public.s3.us-east-2.amazonaws.com',
				API_BASE_URL:
					'https://tradewinds-dev.eastus.cloudapp.azure.com',
				STRIPE_PUBLISHABLE_KEY:
					'pk_test_51JAhKFCQTcpcYTusSG85R25JWHRXIbw9mg6bn2mJAIncKhAhXpxvAemulgavKUw0iv4J1ygM6zSWGbthNAMWGftk00Jzzmiqcs'
			},
			images: {
				domains: [
					'images.unsplash.com',
					'wmarketplacestgact.blob.core.windows.net',
					'm.media-amazon.com',
					'undefined',
					'https'
				]
			}
		};
	}

	/* config options for all phases except development here */
	return {
		i18n,
		reactStrictMode: true,
		env: {
			SITE_URL: 'https://tradewinds.vercel.app',
			// #DEV
			// SITE_URL: 'https://tradewindsmpshoppingsite.azurewebsites.net',
			// #UAT
			// SITE_URL: 'https://tradewindsmpuatshoppingsite.azurewebsites.net',

			BUYER_DASHBOARD_SITE_URL:
				'https://tradewinds-dev-public.s3.us-east-2.amazonaws.com',
			// #DEV
			// 'www.tradewindsdev.com',
			// #UAT
			// 'https://www.tradewindsqa.com/#',
			API_BASE_URL:
				// #DEV
				'https://tradewinds-dev.eastus.cloudapp.azure.com',
			// #UAT
			// 'https://tradewinds-uat-api.azure-api.net',
			STRIPE_PUBLISHABLE_KEY:
				'pk_test_51JAhKFCQTcpcYTusSG85R25JWHRXIbw9mg6bn2mJAIncKhAhXpxvAemulgavKUw0iv4J1ygM6zSWGbthNAMWGftk00Jzzmiqcs'
		},
		images: {
			domains: [
				'images.unsplash.com',
				'wmarketplacestgact.blob.core.windows.net',
				'm.media-amazon.com',
				'https'
			]
		}
	};
}; // End of nextConfig function

module.exports = nextConfig;
