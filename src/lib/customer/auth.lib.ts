import {
	axiosInstance,
	proxyAxiosInstance
} from 'utils/axios-instance.utils';

export const userSignup = async (customerData: any) => {
	try {
		const { data } = await proxyAxiosInstance.post(
			'/v1/auth/buyer-signup',
			customerData
		);
		return {
			customerId: data?.data?.InsertedID,
			message: data.message
		};
	} catch (error) {
		console.log('[userSignup] =', error);
		const { data } = (error as any).response || {};
		throw Error(data?.message || 'Error occurred userSignup');
	}
}; // End of userSignup function

export const userLogin = async (params: any) => {
	try {
		const { data } = await proxyAxiosInstance.post(
			'/auth/login',
			params
		);
		return {
			message: data.message,
			...(data.data || {})
		};
	} catch (error) {
		console.log('[userLogin] =', error);
		const { data } = (error as any).response || {};
		throw Error(data?.message || 'Error occurred userLogin');
	}
}; // End of userLogin function

export const autoLoginCustomer = async () => {
	try {
		const { data } = await proxyAxiosInstance.get('/auth/auto-login');
		return data;
	} catch (error) {
		console.log('[autoLoginCustomer] =', error);
		const { data } = (error as any).response || {};
		throw Error(data?.message || 'Error occurred autoLoginCustomer');
	}
}; // End of autoLoginCustomer function

export const getCustomerDetails = async (token?: string) => {
	try {
		const { data } = await axiosInstance.get('/auth/get-current-user', {
			headers: {
				Authorization: token ? `Bearer ${token}` : ''
			}
		});

		return {
			id: data?.data?.id,
			name: `${data?.data?.first_name} ${data?.data?.last_name}`,
			phone: data?.data?.phone || '',
			email: data?.data?.email || '',
			tradewinds_email: data?.data?.tradewinds_email || ''
		};
	} catch (error) {
		console.log('[getCustomerDetails] =', error);
		const { data } = (error as any).response || {};
		throw Error(data?.message || 'Error occurred getCustomerDetails');
	}
}; // End of getCustomerDetails

export const getCustomerBuyerDetails = async (userId: string) => {
	try {
		const { data } = await proxyAxiosInstance.get(
			`/buyer/user/${userId}`
		);

		return data?.data || {};
	} catch (error) {
		console.log('[getCustomerBuyerDetails] =', error);
		const { data } = (error as any).response || {};
		throw Error(
			data?.message || 'Error occurred getCustomerBuyerDetails'
		);
	}
}; // End of getCustomerBuyerDetails

export const forgetPasswordGenerateLink = async (email: string) => {
	try {
		const { data } = await proxyAxiosInstance.post(
			'/v1/auth/forgot_password',
			{
				email
			}
		);

		return {
			message: data.message,
			...(data.data || {})
		};
	} catch (error) {
		console.log('[forgetPasswordGenerateLink] =', error);
		const { data } = (error as any).response || {};
		throw Error(
			data?.message || 'Error occurred forgetPasswordGenerateLink'
		);
	}
}; // End of forgetPasswordGenerateLink

export const logoutCustomer = async () => {
	try {
		const { data } = await proxyAxiosInstance.get('/auth/logout');
		return {
			message: data.message,
			...(data.data || {})
		};
	} catch (error) {
		console.log('[logoutCustomer] =', error);
		const { data } = (error as any).response || {};
		throw Error(data || 'Error occurred logoutCustomer');
	}
}; // End of logoutCustomer function
