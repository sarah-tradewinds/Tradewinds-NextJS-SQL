import { axiosInstance } from 'utils/axios-instance.utils';
import { generateQueryString } from 'utils/generate_query_string.utils';

export const getProducts = async (params: {
	price_start: number;
	price_end?: number;
	main_category?: string;
	country_or_region?: string;
}) => {
	const queryString = generateQueryString(params);

	try {
		const { data } = await axiosInstance.get(
			`/product/search?${queryString}`
		);
		return data.response || [];
	} catch (error) {
		console.log('[getProducts] =', error);
		const { data, status } = (error as any).response || {};
		if (status >= 500) {
			throw Error('Error occurred in getProducts');
		}

		return [];
	}
}; // End of getProducts
