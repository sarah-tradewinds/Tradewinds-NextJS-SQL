import { axiosInstance } from 'utils/axios-instance.utils';

export const getMainCategories = async (isEco?: boolean) => {
	try {
		const { data } = await axiosInstance.get(
			`/cms/main-category?limit=100000&alpha_sort=${true}&isEco=${isEco}`
		);
		return data.data || [];
	} catch (error) {
		console.log('[getMainCategories] =', error);
		const { data } = (error as any).response || {};
		return [];
	}
}; // End of getMainCategories function

export const getCategoriesByMainCategoryId = async (
	mainCategoryId: string,
	countryName?: string
) => {
	try {
		const { data } = await axiosInstance.get(
			`/cms/category?limit=100000&alpha_sort=${true}&mainCategoryId=${mainCategoryId}&country=${
				countryName || ''
			}`
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
			`/cms/sub-category?limit=100000&alpha_sort=${true}&categoryId=${categoryId}`
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
			`/cms/specific-category?limit=100000&alpha_sort=${true}&subCategoryId=${subCategoryId}`
		);
		return data.data || [];
	} catch (error) {
		console.log('[getSpecificCategoriesBySubCategoryId] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getSpecificCategoriesBySubCategoryId');
		return [];
	}
}; // End of getSpecificCategoriesBySubCategoryId function

export const getTrendingCategoriesByCountry = async (
	countryName?: string
) => {
	try {
		const { data } = await axiosInstance.get(
			`/cms/category/trending?limit=100000&country=${countryName || ''}`
		);
		return data?.data || [];
	} catch (error) {
		console.log('[getTrendingCategoriesByCountry] =', error);
		const { data } = (error as any).response || {};
		return [];
	}
}; // End of getTrendingCategoriesByCountry function

export const getTrendingCategories = async () => {
	try {
		const { data } = await axiosInstance.get(
			'/cms/category/trending?limit=60'
		);
		return data?.data || [];
	} catch (error) {
		console.log('[getTrendingCategories] =', error);
		const { data } = (error as any).response || {};
		return [];
	}
}; // End of getTrendingCategories function

export const getCountries = async () => {
	try {
		const { data } = await axiosInstance.get(
			'/region_country/all?limit=100000'
		);

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
			`/region/region-country/${countryId}`
		);

		return data?.data || {};
	} catch (error) {
		console.log('[getCountryById] =', error);
		return {};
	}
}; // End of getCountryById function

export const getSearchSuggestions = async (
	searchText: string,
	isEco?: boolean
) => {
	try {
		const { data } = await axiosInstance.get(
			`/product/global-search?search_query=${searchText}&lang=en&is_eco=${
				isEco || false
			}`
		);

		return data.data || [];
	} catch (error) {
		console.log('[getSearchSuggestions] =', error);
		const { data } = (error as any).response || {};
		return [];
	}
}; // End of getSearchSuggestions function

export const sendMessageToSeller = async (
	conversationId: string,
	messageText: string
) => {
	const messageData = {
		conversation_id: conversationId,
		message: {
			en: messageText
		}
	};

	try {
		await axiosInstance.post('conversation/message', messageData);
		// return data.data || [];
	} catch (error) {
		console.log('[sendMessageToSeller] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred sendMessageToSeller');
		return [];
	}
}; // End of sendMessageToSeller function

export const createConversation = async (sellerUserId: string) => {
	const payload = {
		type: 'common',
		user_two_id: sellerUserId
	};

	try {
		const { data } = await axiosInstance.post('conversation', payload);
		return data?.data?.id || '';
	} catch (error) {
		console.log(error);
		return null;
	}
}; // End of createConversation

export const sendMessage = async (
	conversationId: string,
	messageText: string
) => {
	const messageData = {
		conversation_id: conversationId,
		message: {
			en: messageText
		}
	};

	try {
		await axiosInstance.post('conversation/message', messageData);
	} catch (error) {
		console.log(error);
	}
}; // End of sendMessage
