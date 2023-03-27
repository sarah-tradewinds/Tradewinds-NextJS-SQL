import { axiosInstance } from 'utils/axios-instance.utils';

export const getAddresses = async (
	buyerId: string,
	addressType?: 'shipping' | 'billing'
) => {
	if (!buyerId) return [];

	let url = `buyer/address/${buyerId}`;
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

export const addAddress = async (address: {
	first_name: string;
	last_name: string;
	address_line1: string;
	address_line2: string;
	address_line_1: string;
	address_line3: string;
	postal_code: string;
	country_id: string;
	state_id: string;
	city_id: string;
	is_default: boolean;
	is_billing_address: boolean;
	buyer_id: string;
}) => {
	const newAddressInfo = {
		first_name: {
			en: address?.first_name || '',
			es: '',
			pt: '',
			fr: ''
		},
		last_name: {
			en: address?.last_name || '',
			es: '',
			pt: '',
			fr: ''
		},
		postal_code: +address.postal_code,
		// phone: parseInt(buyerData?.phone_number),
		address_line1: {
			en: address?.address_line1 || '',
			es: '',
			pt: '',
			fr: ''
		},
		address_line2: {
			en: address?.address_line2 || '',
			es: '',
			pt: '',
			fr: ''
		},
		address_line3: {
			en: address?.address_line3 || '',
			es: '',
			pt: '',
			fr: ''
		},
		// TODO: street_name is not available
		street_name: {
			en: '.',
			es: '.',
			pt: '.',
			fr: '.'
		},
		is_default: address.is_default,
		is_billing_address: address.is_billing_address,
		country_id: address.country_id,
		state_id: address.state_id,
		city_id: address.city_id,
		buyer_id: address.buyer_id || ''
	};

	console.log('buyerData =', newAddressInfo);

	try {
		await axiosInstance.post('buyer/address', newAddressInfo);
	} catch (error) {}
}; // End of addAddress
