import { serviceAxiosInstance } from 'utils/axios-instance.utils';

export const getEcoHomeMainCategoriesAndCategories = async () => {
	try {
		const { data } = await serviceAxiosInstance.get(
			// '/cms_category/home?is_eco=true'
			'/cms_category?is_eco=true'
		);

		return {
			cat_section: data.data[0].cat_section || [],
			is_custom: data.data[0].is_custom || false
		};
	} catch (error) {
		console.log('[getHomeMainCategoriesAndCategories] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getHomeMainCategoriesAndCategories');
		return {
			cat_section: [],
			is_custom: false
		};
	}
}; // End of getHomeMainCategoriesAndCategories function

export const getEcoCategoriesByMainCategoryId = async (
	mainCategoryId: string
) => {
	try {
		const { data } = await serviceAxiosInstance.get(
			`/category/categories/${mainCategoryId}?is_eco=${true}`
		);
		return data.data || [];
	} catch (error) {
		console.log('[getCategoriesByMainCategoryId] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getCategoriesByMainCategoryId');
		return [];
	}
}; // End of getEcoCategoriesByMainCategoryId function
