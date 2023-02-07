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
