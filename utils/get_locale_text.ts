export const getLocaleText = (
	payload: any,
	locale?: string,
	defaultLocale?: string
) => {
	if (typeof payload === 'string') {
		return payload;
	}

	if (typeof payload !== 'object') {
		throw TypeError('Object is required');
	}

	const fallbackLocale = defaultLocale || 'en';

	return payload[locale || fallbackLocale];
};
