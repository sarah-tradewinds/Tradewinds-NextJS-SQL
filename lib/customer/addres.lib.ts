import { serviceAxiosInstance } from 'utils/axios-instance.utils';

export const getAddresses = async (
	buyerId: string,
	addressType?: 'shipping' | 'billing'
) => {
	try {
		const { data } = await serviceAxiosInstance.get(
			`address?user_id=${buyerId}&type=""`
		);

		return data.data || [];
	} catch (error) {
		console.log('[getAddresses] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getAddresses');
		return [];
	}
}; // End of getAddresses function
