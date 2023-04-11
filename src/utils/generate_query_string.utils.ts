export const generateQueryString = (paramsData: object): string => {
	const params = new URLSearchParams();

	for (let key in paramsData) {
		const value = (paramsData as any)[key];
		if (value && value !== 'undefined') {
			params.append(key, value);
		}
	}
	return params.toString();
}; // End of generateQueryString function

export const generateQueryStringSeller = (
	paramsData: object
): string => {
	const params = new URLSearchParams();

	for (let key in paramsData) {
		const value = (paramsData as any)[key];
		if (value && value !== 'undefined') {
			params.append(key, value);
		}
	}
	return params.toString();
}; // End of generateQueryStringSeller function

export const generateQueryStringBDM = (paramsData: object): string => {
	const params = new URLSearchParams();

	for (let key in paramsData) {
		const value = (paramsData as any)[key];
		if (value && value !== 'undefined') {
			params.append(key, value);
		}
	}
	return params.toString();
}; // End of generateQueryStringBDM function
