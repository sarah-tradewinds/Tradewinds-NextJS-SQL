// Third party packages
import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: process.env.API_BASE_URL + '/api/v1'
});

export const serviceAxiosInstance = axios.create({
	baseURL: process.env.API_BASE_URL + '/services/api/v1'
});
