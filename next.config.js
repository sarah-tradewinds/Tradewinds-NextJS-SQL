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
					'https://white-ocean-019fe600f.2.azurestaticapps.net/#',

				BDM_DASHBOARD_SITE_URL:
					'https://white-ocean-019fe600f.2.azurestaticapps.net/#',

				SELLER_DASHBOARD_SITE_URL:
					'https://white-ocean-019fe600f.2.azurestaticapps.net/#',

				API_BASE_URL:
					'https://tradewinds-sql-preprod-as.azurewebsites.net',
				// 'https://tradewinds-production-sql-as.azurewebsites.net',

				STRIPE_PUBLISHABLE_KEY:
					'pk_test_51JAhKFCQTcpcYTusSG85R25JWHRXIbw9mg6bn2mJAIncKhAhXpxvAemulgavKUw0iv4J1ygM6zSWGbthNAMWGftk00Jzzmiqcs'
			},
			images: {
				domains: [
					'tradewindsblobproduction.blob.core.windows.net',
					'images.unsplash.com',
					'wmarketplacestgact.blob.core.windows.net',
					'm.media-amazon.com',
					'undefined',
					'https',
					'picsum.photos',
					'localhost'
				]
			}
		};
	}

	/* config options for all phases except development here */
	return {
		i18n,
		reactStrictMode: true,
		env: {
			// SITE_URL: 'https://www.tradewindsmarketplace.com',

			// BUYER_DASHBOARD_SITE_URL:
			// 	'https://www.dashboard.tradewindsmarketplace.com/#',

			// BDM_DASHBOARD_SITE_URL:
			// 	'https://www.dashboard.tradewindsmarketplace.com/#',

			// SELLER_DASHBOARD_SITE_URL:
			// 	'https://www.dashboard.tradewindsmarketplace.com/#',

			// API_BASE_URL:
			// 	'https://tradewinds-production-sql-as.azurewebsites.net',

			// # PRE-PROD
			// SITE_URL: 'http://localhost:3000',
			SITE_URL:
				'https://tradewindsmppreprodshoppingsite.azurewebsites.net',

			BUYER_DASHBOARD_SITE_URL:
				'https://white-ocean-019fe600f.2.azurestaticapps.net/#',

			BDM_DASHBOARD_SITE_URL:
				'https://white-ocean-019fe600f.2.azurestaticapps.net/#',

			SELLER_DASHBOARD_SITE_URL:
				'https://white-ocean-019fe600f.2.azurestaticapps.net/#',

			API_BASE_URL:
				'https://tradewinds-sql-preprod-as.azurewebsites.net',

			STRIPE_PUBLISHABLE_KEY:
				'pk_live_51JAhKFCQTcpcYTus0nINDA07UHO9vC8tKxCUzQgYkZhsJuuwXjrVetP6guxJzrOIrvPowH9FpGpMIK3ZfxhqeAQc00AmdLhqZD'
		},
		images: {
			domains: [
				'tradewindsblobproduction.blob.core.windows.net',
				'images.unsplash.com',
				'wmarketplacestgact.blob.core.windows.net',
				'm.media-amazon.com',
				'https',
				'picsum.photos'
			]
		}
	};
}; // End of nextConfig function

module.exports = nextConfig;
