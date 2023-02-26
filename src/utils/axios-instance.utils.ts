// Third party packages
import axios from 'axios';

let baseURL = '';
// For code that run on server
if (typeof window === 'undefined') {
	baseURL = process.env.SITE_URL || '';
}

const API_BASE_URL = process.env.API_BASE_URL;

export const proxyAxiosInstance = axios.create({
	baseURL: `${baseURL}/api/v1/`
});

export const axiosInstance = axios.create({
	baseURL: `${API_BASE_URL}/v1`
});

axiosInstance.interceptors.request.use((request) => {
	if (typeof window !== 'undefined') {
		const accessToken = localStorage.getItem('access_token');
		if (accessToken) {
			(request.headers as any).Authorization = `Bearer ${accessToken}`;
		}
	}

	return request;
});
