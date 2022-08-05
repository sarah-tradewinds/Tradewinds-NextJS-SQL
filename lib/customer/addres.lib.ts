import { serviceAxiosInstance } from 'utils/axios-instance.utils';

export const getAddresses = async (userId: string) => {
	try {
		const { data } = await serviceAxiosInstance.get(
			`address?user_id=${userId}`
		);

		return data.data || [];
	} catch (error) {
		console.log('[getAddresses] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getAddresses');
		return [];
	}
}; // End of getAddresses function
