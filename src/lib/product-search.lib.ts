import { axiosInstance } from 'utils/axios-instance.utils';
import { getDefaultProductAndProductVariants } from 'utils/common.util';
import { generateQueryString } from 'utils/generate_query_string.utils';

export const getProducts = async (params: {
	price_start?: string | number;
	price_end?: string | number;
	categories?: string;
	query?: string;
	main_category?: string;
	main_category_id?: string;
	category?: string;
	category_id?: string;
	sub_category?: string;
	sub_category_id?: string;
	sub_sub_category?: string;
	specific_category_id?: string;
	country_of_region?: string;
	country?: string;
	is_eco?: boolean;
	is_all_trending?: boolean;
	is_customizable?: boolean;
	is_live_buy?: boolean;
	is_live?: boolean;
	minimum_order?: string | number;
	maximum_order?: string | number;
	minimum_order_quantity?: boolean;
	page_number?: string | number;
	data_per_page?: string | number;
	lang?: string;
}) => {
	if (params.minimum_order || params.maximum_order) {
		params.minimum_order_quantity = true;
	}

	params.data_per_page = 10;
	const queryString = generateQueryString(params);

	try {
		const { data } = await axiosInstance.get(
			`/product/search?${queryString}`
		);

		const products = data?.data?.map((product: any) => {
			const { defaultVariant, variants } =
				getDefaultProductAndProductVariants(
					product?.edges?.product_variants || []
				);

			product.product_variants = [defaultVariant, ...variants];
			return product;
		});

		return {
			categories: data.categories || {},
			data: products || []
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
		const { data } = await axiosInstance.get(
			`cms/category?mainCategoryId=${mainCategoryId}&limit=50000&sortByTrending=true`
		);

		console.log('data.data', data.data);

		return (
			{
				main_category: data.data?.[0]?.edges?.main_category || {},
				categories: data.data || {}
			} || {}
		);
	} catch (error) {
		console.log('[getProducts] =', error);
		const { data, status } = (error as any).response || {};
		// if (status >= 500) {
		//   throw Error('Error occurred in getProducts');
		// }
		return {};
	}
}; // End of getSelectedMainCategoryAndCategories
