import { axiosInstance } from 'utils/axios-instance.utils';

export const getHeroCarousels = async (isEco?: boolean) => {
	try {
		const { data } = await axiosInstance.get(
			`/cms/carousel?isEco=${isEco || false}`
		);
		return data.data || [];
	} catch (error) {
		console.log('[getHeroCarousels] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred in getHeroCarousels');
		return [];
	}
}; // End of getHeroCarousels function

export const getCardAList = async (isEco?: boolean) => {
	try {
		const { data } = await axiosInstance.get(
			`/cms/cardA?isEco=${isEco || false}`
		);

		return data.data || [];
	} catch (error) {
		console.log('[getCardAList] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getCardAList');
		return [];
	}
}; // End of getCardAList function

export const getCardB = async (isEco?: boolean) => {
	try {
		const { data } = await axiosInstance.get(
			`/cms/cardB?isEco=${isEco || false}`
		);

		return data?.data?.[0] || {};
	} catch (error) {
		console.log('[getCardB] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getCardB');
		return {};
	}
}; // End of getCardB function

export const getHomeMainCategoriesAndCategories = async (): Promise<{
	cat_section: any[];
	is_custom: boolean;
}> => {
	try {
		const { data } = await axiosInstance.get('/cms/category-cms');
		return {
			cat_section: data.data[0].cat_section,
			is_custom: data.data[0].is_custom
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

export const getHomeCountries = async () => {
	try {
		const { data } = await axiosInstance.get(
			'/region/all/region-countries'
		);

		return data.data || [];
	} catch (error) {
		console.log('[getHomeCountries] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getHomeCountries');
		return [];
	}
}; // End of getHomeCountries function

export const getHomeAdvertisements = async () => {
	try {
		const { data } = await axiosInstance.get(
			'/advertisement/getalladvertisement'
		);

		return (data.data || [])?.slice(0, 2) || [];
	} catch (error) {
		console.log('[getHomeAdvertisement] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getHomeAdvertisement');
		return [];
	}
}; // End of getHomeAdvertisements function
