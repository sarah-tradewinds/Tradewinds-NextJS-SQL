import { axiosInstance } from 'utils/axios-instance.utils';

export const getEcoHomeMainCategoriesAndCategories = async () => {
	try {
		const { data } = await axiosInstance.get(
			'cms/cms-category-eco'
		);

		const categoryCMSData = data?.data?.[0] || {};
		return {
			cat_section: categoryCMSData.cat_section || [],
			is_custom: categoryCMSData.is_custom
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
		const { data } = await axiosInstance.get(
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
