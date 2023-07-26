import { AxiosError } from 'axios';
import {
	axiosInstance,
	proxyAxiosInstance
} from 'utils/axios-instance.utils';

export const userSignup = async (customerData: any) => {
	try {
		const { data } = await proxyAxiosInstance.post(
			'/auth/buyer-signup',
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

export const resendMail = async (email: string) => {
	try {
		const { data } = await axiosInstance.get(
			`/auth/email-resend/${email}`
		);
		return {
			message: data.message,
			...(data.data || {})
		};
	} catch (error) {
		console.log('[resendMail] =', error);
		const { data } = (error as any).response || {};
		throw Error(data?.message || 'Error occurred resendMail');
	}
}; // End of resendMail function

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

		const customerData = data?.data || {};

		return {
			userId: customerData?.id,
			buyerId: customerData?.edges?.buyer?.id,
			name: `${customerData?.first_name} ${customerData?.last_name}`,
			phone: customerData?.phone || '',
			email: customerData?.email || '',
			tradewinds_email: customerData?.tradewinds_email || ''
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
		const { data } = await axiosInstance.patch(
			'/auth/forgot-password',
			{
				email
			}
		);

		return {
			message: data.message,
			...(data.data || {})
		};
	} catch (error) {
		const err = error as AxiosError;
		const errorMessage = err?.response?.data?.message;
		throw Error(
			errorMessage || 'Error occurred forgetPasswordGenerateLink'
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
