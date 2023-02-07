import { axiosInstance } from 'utils/axios-instance.utils';

export const getTrendingProducts = async (isEco?: boolean) => {
	try {
		const { data } = await axiosInstance.get(
			`/product/trending?is_eco=${isEco}`
		);

		return data.data || [];
	} catch (error) {
		console.log('[getTrendingProducts] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getTrendingProducts');
		return [];
	}
}; // End of getTrendingProducts function
