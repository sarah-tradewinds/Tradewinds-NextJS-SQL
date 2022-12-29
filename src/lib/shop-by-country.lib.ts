import { serviceAxiosInstance } from 'utils/axios-instance.utils';

export const getRegionsAndCountries = async (isEco?: boolean) => {
	try {
		const { data } = await serviceAxiosInstance.get('/region/all');

		return data.data || [];
	} catch (error) {
		console.log('[getRegionsAndCountries] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getRegionsAndCountries');
		return [];
	}
}; // End of getRegionsAndCountries function
