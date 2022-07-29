import { serviceAxiosInstance } from 'utils/axios-instance.utils';

export const getHeroCarousels = async () => {
	try {
		const { data } = await serviceAxiosInstance.get(
			'/carousel/getallcarousel'
		);
		return data.data || [];
	} catch (error) {
		console.log('[getHeroCarousels] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred in getHeroCarousels');
		return [];
	}
}; // End of getHeroCarousels function

export const getCardAList = async () => {
	try {
		const { data } = await serviceAxiosInstance.get(
			'/cardA/getallcardA'
		);

		return data.data || [];
	} catch (error) {
		console.log('[getCardAList] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getCardAList');
		return [];
	}
}; // End of getCardAList function

export const getCardB = async () => {
	try {
		const { data } = await serviceAxiosInstance.get(
			'/cardB/getallcardB'
		);

		return data.data ? data.data[0] : {};
	} catch (error) {
		console.log('[getCardB] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getCardB');
		return {};
	}
}; // End of getCardB function

export const getHomeMainCategoriesAndCategories = async () => {
	try {
		const { data } = await serviceAxiosInstance.get('/cms_category');
		return data.data[0].cat_section;
	} catch (error) {
		console.log('[getHomeMainCategoriesAndCategories] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getHomeMainCategoriesAndCategories');
		return [];
	}
}; // End of getHomeMainCategoriesAndCategories function

export const getHomeCountries = async () => {
	try {
		const { data } = await serviceAxiosInstance.get(
			'/region_country/all'
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
		const { data } = await serviceAxiosInstance.get(
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
