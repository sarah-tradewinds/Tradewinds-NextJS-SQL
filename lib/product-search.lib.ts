import { serviceAxiosInstance } from 'utils/axios-instance.utils';
import { generateQueryString } from 'utils/generate_query_string.utils';

export const getProducts = async (params: {
	price_start: number;
	price_end?: number;
	main_category?: string;
	category?: string;
	country_or_region?: string;
}) => {
	const queryString = generateQueryString(params);

	try {
		const { data } = await serviceAxiosInstance.get(
			`/product/search?${queryString}`

			// TODO: Tmp
			// `/product/all?${queryString}`
		);

		return data.response || [];
		// return data.response || [];
	} catch (error) {
		console.log('[getProducts] =', error);
		const { data, status } = (error as any).response || {};
		if (status >= 500) {
			throw Error('Error occurred in getProducts');
		}

		return [];
	}
}; // End of getProducts
