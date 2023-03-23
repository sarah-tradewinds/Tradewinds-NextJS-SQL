import { axiosInstance } from 'utils/axios-instance.utils';

export const getAddresses = async (
	buyerId: string,
	addressType?: 'shipping' | 'billing'
) => {
	if (!buyerId) return [];

	let url = `buyer/address/${buyerId}?isShippingAddress=${true}`;
	if (addressType === 'billing') {
		url = `buyer/address/${buyerId}?isBillingAddress=${true}`;
	}

	try {
		// const { data } = await proxyAxiosInstance.get(url);
		const { data } = await axiosInstance.get(url);

		return data.data || [];
	} catch (error) {
		console.log('[getAddresses] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getAddresses');
		return [];
	}
}; // End of getAddresses function
