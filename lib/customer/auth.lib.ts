import { serviceAxiosInstance } from 'utils/axios-instance.utils';

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
			'/auth/signup',
			customerData
		);
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
		const { data } = await serviceAxiosInstance.post(
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
		throw Error(data || 'Error occurred userLogin');
	}
}; // End of userLogin function

// const forgetPasswordChange = async (params: any, token: string) => {
// 	return await fetch(`${URLS.RESET_PASSWORD}/${token}`, {
// 		method: 'POST',
// 		body: JSON.stringify(params)
// 	})
// 		.then((response) => {
// 			return response;
// 		})
// 		.catch((err) => {
// 			console.log('err', err);
// 			throw new Error('Internal server error');
// 		});
// };

// const forgetPasswordGenerateLink = async (params: any) => {
// 	return await fetch(URLS.FORGOT_PASSWORD, {
// 		method: 'POST',
// 		body: JSON.stringify(params)
// 	})
// 		.then((response) => {
// 			return response;
// 		})
// 		.catch((err) => {
// 			console.log('err', err);
// 			throw new Error('Internal server error');
// 		});
// };

// const getCurrentUser = async (token: string) => {
// 	return await fetch(URLS.GET_CURRENT_USER, {
// 		method: 'GET',
// 		Authorization: 'Bearer ' + token
// 	})
// 		.then((response) => {
// 			return response;
// 		})
// 		.catch((err) => {
// 			console.log('err', err);
// 			throw new Error('Internal server error');
// 		});
// };

// const userSignup = async (params: any) => {
// 	return await fetch(URLS.USER_SIGNUP, {
// 		method: 'POST',
// 		body: JSON.stringify(params)
// 	})
// 		.then((response) => {
// 			return response;
// 		})
// 		.catch((err) => {
// 			console.log('err', err);
// 			throw new Error('Internal server error');
// 		});
// };

// const verifyUser = async (userId: any) => {
// 	return await fetch(`${URLS.VERIFY_USER}/${userId}`, {
// 		method: 'POST'
// 	})
// 		.then((response) => {
// 			return response;
// 		})
// 		.catch((err) => {
// 			console.log('err', err);
// 			throw new Error('Internal server error');
// 		});
// };
