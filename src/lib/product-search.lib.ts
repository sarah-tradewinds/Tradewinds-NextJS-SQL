import { serviceAxiosInstance } from 'utils/axios-instance.utils';
import { generateQueryString } from 'utils/generate_query_string.utils';

export const getProducts = async (params: {
	price_start?: number;
	price_end?: number;
	categories?: string;
	all?: string;
	main_category?: string;
	category?: string;
	sub_category?: string;
	sub_sub_category?: string;
	country_of_region?: string;
	is_eco?: boolean;
	is_all_trending?: boolean;
	is_customizable?: boolean;
	is_ready_to_ship?: boolean;
	is_live?: boolean;
	minimum_order?: string | number;
	maximum_order?: string | number;
	minimum_order_quantity?: boolean;
}) => {
	if (params.minimum_order || params.maximum_order) {
		params.minimum_order_quantity = true;
	}

	const queryString = generateQueryString(params);

	try {
		const { data } = await serviceAxiosInstance.get(
			`/product/search?${queryString}`
		);

		return {
			categories: data.categories || {},
			data: data?.response || []
		};
	} catch (error) {
		console.log('[getProducts] =', error);
		return {
			categories: {},
			data: []
		};
	}
}; // End of getProducts

export const getSelectedMainCategoryAndCategories = async (
	mainCategoryId: string
) => {
	try {
		const { data } = await serviceAxiosInstance.get(
			`/category/trending_category/${mainCategoryId}`
		);

		return data.data || {};
	} catch (error) {
		console.log('[getProducts] =', error);
		const { data, status } = (error as any).response || {};
		// if (status >= 500) {
		//   throw Error('Error occurred in getProducts');
		// }
		return {};
	}
}; // End of getSelectedMainCategoryAndCategories
