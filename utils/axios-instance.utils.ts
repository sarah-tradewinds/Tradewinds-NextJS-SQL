// Third party packages
import axios from 'axios';

// export const axiosInstance = axios.create({
//  baseURL: process.env.API_BASE_URL + '/api/v1'
// });

// export const serviceAxiosInstance = axios.create({
//  baseURL: process.env.API_BASE_URL + '/services/api/v1'
// });

export const axiosInstance = axios.create({
	baseURL: `${process.env.SITE_URL}/api/v1`
});

export const serviceAxiosInstance = axios.create({
	baseURL: `${process.env.SITE_URL}/api/v1/services/api/v1`
});

serviceAxiosInstance.interceptors.request.use(
	(request) => {
		if (typeof window !== 'undefined') {
			const accessToken = localStorage.getItem('tw-access_token');
			if (accessToken) {
				(
					request as any
				).headers.Authorization = `Bearer ${accessToken}`;
			}
		}
		return request;
	},
	(error) => {
		return Promise.reject(error);
	}
);
