const path = require('path');

module.exports = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'hi', 'es', 'fr', 'pt'],
		reloadOnPrerender: process.env.NODE_ENV === 'development'
	}
};
