// Third party packages
import axios from 'axios';

let baseURL = '';
// For code that run on server
if (typeof window === 'undefined') {
	baseURL = process.env.SITE_URL || '';
}

const API_BASE_URL = process.env.API_BASE_URL;

export const proxyAxiosInstance = axios.create({
	baseURL: `${baseURL}/api/v1`
});

export const proxyServiceAxiosInstance = axios.create({
	baseURL: `${baseURL}/api/v1/services/api/v1`
});

proxyServiceAxiosInstance.interceptors.request.use(
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

export const axiosInstance = axios.create({
	baseURL: `${API_BASE_URL}/api/v1`
});

export const serviceAxiosInstance = axios.create({
	baseURL: `${API_BASE_URL}/services/api/v1`
});
