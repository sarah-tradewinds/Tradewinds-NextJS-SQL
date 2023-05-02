import { generateQueryString } from './generate_query_string.utils';

export const applyFiltersByUrl = (filterParams: {
	min_order?: number;
	price_start?: number;
	price_end?: number;
	categories?: string;
	main_category?: string;
	main_category_id?: string;
	category?: string;
	category_id?: string;
	sub_category?: string;
	sub_category_id?: string;
	sub_sub_category?: string;
	sub_sub_category_id?: string;
	all?: string;
	country_of_region?: string;
	country_id?: string;
	is_eco?: boolean;
	is_all_trending?: boolean;
}) => {
	return {
		url: generateQueryString(filterParams),
		payload: filterParams
	};
};
