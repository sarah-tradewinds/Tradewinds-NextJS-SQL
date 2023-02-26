import { proxyAxiosInstance } from 'utils/axios-instance.utils';

export const getAddresses = async (
	buyerId: string,
	addressType?: 'shipping' | 'billing'
) => {
	let url = `buyer/${buyerId}/address?isShippingAddress=${true}`;
	if (addressType === 'billing') {
		url = `buyer/${buyerId}/address?isBillingAddress=${true}`;
	}

	try {
		const { data } = await proxyAxiosInstance.get(url);

		return data.data || [];
	} catch (error) {
		console.log('[getAddresses] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getAddresses');
		return [];
	}
}; // End of getAddresses function
