import { axiosInstance } from 'utils/axios-instance.utils';

export const getMainCategories = async (isEco?: boolean) => {
	try {
		const { data } = await axiosInstance.get(
			`/main_category?is_eco=${isEco}`
		);
		return data.data || [];
	} catch (error) {
		console.log('[getMainCategories] =', error);
		const { data } = (error as any).response || {};
		return [];
	}
}; // End of getMainCategories function

export const getCategoriesByMainCategoryId = async (
	mainCategoryId: string
) => {
	try {
		const { data } = await axiosInstance.get(
			`/category/categories/${mainCategoryId}`
		);
		return data.data || [];
	} catch (error) {
		console.log('[getCategoriesByMainCategoryId] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getCategoriesByMainCategoryId');
		return [];
	}
}; // End of getCategoriesByMainCategoryId function

export const getSubCategoriesByCategoryId = async (
	categoryId: string
) => {
	try {
		const { data } = await axiosInstance.get(
			`/sub_category/sub_categories/${categoryId}`
		);
		return data.data || [];
	} catch (error) {
		console.log('[getSubCategoriesByCategoryId] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getSubCategoriesByCategoryId');
		return [];
	}
}; // End of getSubCategoriesByCategoryId function

export const getSpecificCategoriesBySubCategoryId = async (
	subCategoryId: string
) => {
	try {
		const { data } = await axiosInstance.get(
			`/specific_category/sub_sub_categories/${subCategoryId}`
		);
		return data.data || [];
	} catch (error) {
		console.log('[getSpecificCategoriesBySubCategoryId] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getSpecificCategoriesBySubCategoryId');
		return [];
	}
}; // End of getSpecificCategoriesBySubCategoryId function

export const getCountries = async () => {
	try {
		const { data } = await axiosInstance.get('/region_country/all');

		return data.data || [];
	} catch (error) {
		console.log('[getCountries] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getCountries');
		return [];
	}
}; // End of getCountries function

export const getCountryById = async (countryId: string) => {
	try {
		const { data } = await axiosInstance.get(
			`/region_country/${countryId}`
		);

		return data?.data || {};
	} catch (error) {
		console.log('[getCountryById] =', error);
		return {};
	}
}; // End of getCountryById function

export const getSearchSuggestions = async (searchText: string) => {
	try {
		const { data } = await axiosInstance.get(
			`/product/global/search?query=${searchText}`
		);

		return data.data || [];
	} catch (error) {
		console.log('[getSearchSuggestions] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getSearchSuggestions');
		return [];
	}
}; // End of getSearchSuggestions function

export const sendMessageToSeller = async (payload: {
	buyerEmail: string;
	sellerEmail: string;
	subject: string;
	message: string;
}) => {
	const { buyerEmail, sellerEmail, subject, message } = payload;

	try {
		const { data } = await axiosInstance.post('/message', {
			from: buyerEmail,
			to: [sellerEmail],
			cc: [],
			subject,
			message,
			type: 'enquiry',
			created_by: buyerEmail
		});

		return data.data || [];
	} catch (error) {
		console.log('[sendMessageToSeller] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred sendMessageToSeller');
		return [];
	}
}; // End of sendMessageToSeller function
