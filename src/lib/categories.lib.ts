import { serviceAxiosInstance } from 'utils/axios-instance.utils';

export const getAllCategoryByAlphabets = async () => {
	https: try {
		const { data } = await serviceAxiosInstance.get('/categories/all');
		return data.data || {};
	} catch (error) {
		console.log('[getAllCategoryByAlphabets] =', error);
		const { data, status } = (error as any).response || {};
		return {};
	}
}; // End of getAllCategoryByAlphabets function
