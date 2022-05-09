const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
	i18n,
	reactStrictMode: true,
	env: {
		// API_BASE_URL: 'http://localhost:8070/api/v1'
		API_BASE_URL:
			'https://tradewinds-dev.eastus.cloudapp.azure.com/services/api/v1'
	}
};

module.exports = nextConfig;
