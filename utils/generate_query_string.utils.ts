export const generateQueryString = (paramsData: object): string => {
	const params = new URLSearchParams();

	for (let key in paramsData) {
		params.append(key, (paramsData as any)[key]);
	}

	return params.toString();
}; // End of generateQueryString function
