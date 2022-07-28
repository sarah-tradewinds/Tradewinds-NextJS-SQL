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
					'pk_test_51LQS83SG6gzCLsPFMb3sIfOyx51dr4YKXsFIHLgq7loMUzAWBKAXRBJFpsdjbIDcFy5xC8Mausn27RPb8F4UUITy00GK4W5tvS',
				STRIPE_SECRET_KEY:
					'sk_test_51LQS83SG6gzCLsPFsFv7ks3l9rbmeOhh3hDg7EQJ3ipATyFF5tDpvsTjX6RIleyBv62K94p8iuNAp0mUCtTEkFQM00ETUL64SY'
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
			BUYER_DASHBOARD_SITE_URL:
				'https://tradewinds-dev-public.s3.us-east-2.amazonaws.com',
			API_BASE_URL: 'https://tradewinds-dev.eastus.cloudapp.azure.com',
			STRIPE_PUBLISHABLE_KEY:
				'pk_test_51LQS83SG6gzCLsPFMb3sIfOyx51dr4YKXsFIHLgq7loMUzAWBKAXRBJFpsdjbIDcFy5xC8Mausn27RPb8F4UUITy00GK4W5tvS',
			STRIPE_SECRET_KEY:
				'sk_test_51LQS83SG6gzCLsPFsFv7ks3l9rbmeOhh3hDg7EQJ3ipATyFF5tDpvsTjX6RIleyBv62K94p8iuNAp0mUCtTEkFQM00ETUL64SY'
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
