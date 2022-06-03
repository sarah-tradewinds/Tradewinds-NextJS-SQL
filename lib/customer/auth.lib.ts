import {
	axiosInstance,
	serviceAxiosInstance
} from 'utils/axios-instance.utils';

export const userSignup = async (customerData: any) => {
	try {
		const { data } = await axiosInstance.post(
			'/auth/buyer_signup',
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
		const { data } = await axiosInstance.post('/auth/login', params);
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

export const autoLoginCustomer = async () => {
	try {
		const { data } = await axiosInstance.get('/auth/auto-login');
		return data;
	} catch (error) {
		console.log('[autoLoginCustomer] =', error);
		const { data } = (error as any).response || {};
		throw Error(data || 'Error occurred autoLoginCustomer');
	}
}; // End of autoLoginCustomer function

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

export const logoutCustomer = async () => {
	try {
		const { data } = await axiosInstance.get('/auth/logout');
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
