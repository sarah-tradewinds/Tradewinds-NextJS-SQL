import fetch from '../../../../data/api/service-helpers';

const URLS = {
	GET_CURRENT_USER: '/services/api/v1/auth/user/me',
	USER_LOGIN: '/services/api/v1/auth/login',
	USER_SIGNUP: '/services/api/v1/auth/signup'
};

const forgetPasswordChange = async (params: any) => {
	throw new Error('Internal server error');
	// return await fetch(URLS.USER_LOGIN, {
	// 	method: 'POST',
	// 	body: JSON.stringify(params)
	// })
	// 	.then((response) => {
	// 		return response;
	// 	})
	// 	.catch((err) => {
	// 		console.log('err', err);
	// 		throw new Error('Internal server error');
	// 	});
};

const forgetPasswordGenerateLink = async (params: any) => {
	throw new Error('Need to implement');
	// return await fetch(URLS.USER_LOGIN, {
	// 	method: 'POST',
	// 	body: JSON.stringify(params)
	// })
	// 	.then((response) => {
	// 		return response;
	// 	})
	// 	.catch((err) => {
	// 		console.log('err', err);
	// 		throw new Error('Internal server error');
	// 	});
};

const getCurrentUser = async (token: string) => {
	return await fetch(URLS.GET_CURRENT_USER, {
		method: 'GET',
		Authorization: 'Bearer ' + token
	})
		.then((response) => {
			return response;
		})
		.catch((err) => {
			console.log('err', err);
			throw new Error('Internal server error');
		});
};

const userLogin = async (params: any) => {
	return await fetch(URLS.USER_LOGIN, {
		method: 'POST',
		body: JSON.stringify(params)
	})
		.then((response) => {
			return response;
		})
		.catch((err) => {
			console.log('err', err);
			throw new Error('Internal server error');
		});
};

const userSignup = async (params: any) => {
	return await fetch(URLS.USER_SIGNUP, {
		method: 'POST',
		body: JSON.stringify(params)
	})
		.then((response) => {
			return response;
		})
		.catch((err) => {
			console.log('err', err);
			throw new Error('Internal server error');
		});
};

export {
	forgetPasswordChange,
	forgetPasswordGenerateLink,
	getCurrentUser,
	userLogin,
	userSignup
};
