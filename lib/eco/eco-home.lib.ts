import { serviceAxiosInstance } from 'utils/axios-instance.utils';

export const getEcoHomeMainCategoriesAndCategories = async () => {
	try {
		// const { data } = await serviceAxiosInstance.get(
		// 	'/main_category?is_eco=true'
		// );
		// const mainCategories: any[] = data.data || [];
		// // Sorting main category
		// const sortedMainCategories =
		// 	mainCategories.sort(
		// 		(a: any, b: any) => a.trending_rank - b.trending_rank
		// 	) || [];
		// // slicing main category
		// const sevenMainCategories = sortedMainCategories.splice(0, 7);
		// const ecoMainCategoriesAndCategories = [];
		// for (const mainCategory of sevenMainCategories) {
		// 	// Fetching eco categories by mainCategoryId
		// 	const categories = await getEcoCategoriesByMainCategoryId(
		// 		mainCategory.id
		// 	);
		// 	const sevenCategories = categories.splice(0, 7) || [];
		// 	const formattedSevenCategories = sevenCategories.map(
		// 		(category: any) => {
		// 			return {
		// 				categories: category
		// 			};
		// 		}
		// 	);
		// 	// mainCategory.categories = formattedSevenCategories;
		// 	ecoMainCategoriesAndCategories.push({
		// 		main_category: mainCategory,
		// 		categories: formattedSevenCategories
		// 	});
		// }
		// return ecoMainCategoriesAndCategories || [];

		const { data } = await serviceAxiosInstance.get(
			'/cms_category/home?is_eco=true'
		);

		const ecoMainCategoriesAndCategories = [];
		for (let mainCategory of data.data) {
			ecoMainCategoriesAndCategories.push({
				main_category: mainCategory,
				categories: mainCategory.categories.map((category: any) => ({
					categories: category
				}))
			});
		}

		return ecoMainCategoriesAndCategories || [];
	} catch (error) {
		console.log('[getHomeMainCategoriesAndCategories] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getHomeMainCategoriesAndCategories');
		return [];
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
