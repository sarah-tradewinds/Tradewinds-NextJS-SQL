import { serviceAxiosInstance } from 'utils/axios-instance.utils';

export const getAllCategoryByAlphabets = async () => {
	https: try {
		const { data } = await serviceAxiosInstance.get('/categories/all');
		return data.data || {};
	} catch (error) {
		console.log('[getAllCategoryByAlphabets] =', error);
		const { data, status } = (error as any).response || {};
		// if (status >= 500) {
		// 	throw Error(
		// 		'Error occurred in getAllCategoryByAlphabets'
		// 	);
		// }
		return {};
	}
}; // End of getAllCategoryByAlphabets function
