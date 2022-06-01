import axios from 'axios';
import {
	axiosInstance,
	serviceAxiosInstance
} from 'utils/axios-instance.utils';

const URLS = {
	FORGOT_PASSWORD: '/v1/auth/forgot_password',
	GET_CURRENT_USER: '/v1/auth/user/me',
	RESET_PASSWORD: '/v1/auth/forgot_password_reset',
	USER_LOGIN: '/v1/auth/login',
	USER_SIGNUP: '/v1/auth/signup',
	VERIFY_USER: '/v1/auth/activate_account'
};

export const userSignup = async (customerData: any) => {
	try {
		const { data } = await serviceAxiosInstance.post(
			'/auth/buyer_signup',
			customerData
		);
		console.log(data);
		return {
			customerId: data?.data?.InsertedID,
			message: data.message
		};
	} catch (error) {
		console.log('[userLogin] =', error);
		const { data } = (error as any).response || {};
		throw Error(data || 'Error occurred userLogin');
	}
}; // End of userSignup function

export const userLogin = async (params: any) => {
	try {
		const { data } = await axios.post(
			'http://localhost:3000/api/v1/auth/login',
			params
		);
		return {
			message: data.message,
			...(data.data || {})
		};
	} catch (error) {
		console.log('[userLogin] =', error);
		const { data } = (error as any).response || {};
		throw Error(data || 'Error occurred userLogin');
	}
}; // End of userLogin function

export const getCustomerDetails = async (token?: string) => {
	try {
		const { data } = await serviceAxiosInstance.get('/auth/user/me', {
			headers: {
				Authorization: token ? `Bearer ${token}` : ''
			}
		});

		return {
			name: `${data?.data?.first_name} ${data?.data?.last_name}`,
			id: data?.data?.id
		};
	} catch (error) {
		console.log('[getCustomerDetails] =', error);
		const { data } = (error as any).response || {};
		throw Error(data?.message || 'Error occurred getCustomerDetails');
	}
}; // End of getCustomerDetails

export const forgetPasswordGenerateLink = async (email: string) => {
	try {
		const { data } = await axiosInstance.post('/auth/forgot_password', {
			email
		});

		return {
			message: data.message,
			...(data.data || {})
		};
	} catch (error) {
		console.log('[forgetPasswordChange] =', error);
		const { data } = (error as any).response || {};
		throw Error(
			data?.message || 'Error occurred forgetPasswordGenerateLink'
		);
	}
}; // End of forgetPasswordGenerateLink
