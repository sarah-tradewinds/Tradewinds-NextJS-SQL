import { axiosInstance } from 'utils/axios-instance.utils';

export const getCategories = async () => {
	try {
		const { data } = await axiosInstance.get('/categories');

		return data.data || [];
	} catch (error) {
		console.log('[getCategories] =', error);
		const { data } = (error as any).response || {};
		throw Error(data || 'Error occurred getCategories');
	}
}; // End of getHomeCategories function
