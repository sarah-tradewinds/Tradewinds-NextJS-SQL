// Third party packages
import {
	getCategoriesByMainCategoryId,
	getMainCategories,
	getSpecificCategoriesBySubCategoryId,
	getSubCategoriesByCategoryId
} from 'lib/common.lib';
import useSWR from 'swr';

export const useMainCategories = () => {
	// Fetching all main-categories
	const { data, error, isValidating } = useSWR(
		`main_category?is_eco${false}`,
		() => getMainCategories(false)
	);

	const isMainCategoriesLoading = !data && !error && isValidating;

	return {
		mainCategories: data || [],
		isMainCategoriesLoading,
		error,
		isValidating
	};
};

export const useCategoriesByMainCategoryId = (
	mainCategoryId: string
) => {
	// Fetching categories based on selectedMainCategory
	const { data, error, isValidating } = useSWR(
		`/category/categories/${mainCategoryId}`,
		mainCategoryId
			? () => getCategoriesByMainCategoryId(mainCategoryId)
			: null
	);

	const isCategoriesLoading = !data && !error && isValidating;

	return {
		categories: data || [],
		isCategoriesLoading,
		error,
		isValidating
	};
};

export const useSubCategoriesByCategoryId = (categoryId: string) => {
	// Fetching sub-categories based on category_id
	const { data, error, isValidating } = useSWR(
		`/sub_category/sub_categories/${categoryId}`,
		categoryId ? () => getSubCategoriesByCategoryId(categoryId) : null
	);

	const isSubCategoriesLoading = !data && !error && isValidating;

	return {
		subCategories: data || [],
		isSubCategoriesLoading,
		error,
		isValidating
	};
};

export const useSpecificCategoriesBySubCategoryId = (
	subCategoryId: string
) => {
	// Fetching specific-categories based on sub_category_id
	const { data, error, isValidating } = useSWR(
		`/specific_category/sub_sub_categories/${subCategoryId}`,
		subCategoryId
			? () => getSpecificCategoriesBySubCategoryId(subCategoryId)
			: null
	);

	const isSpecificCategoriesLoading = !data && !error && isValidating;

	return {
		specificCategories: data || [],
		isSpecificCategoriesLoading,
		error,
		isValidating
	};
};
