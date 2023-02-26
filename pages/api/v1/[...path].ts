import { NextApiHandler } from 'next';

// Third party packages

// utils
import { axiosInstance } from 'utils/axios-instance.utils';
import { generateQueryString } from 'utils/generate_query_string.utils';
import { getHttpMethod } from 'utils/get_method.utils';

const handler: NextApiHandler = async (req, res) => {
	const httpMethod = getHttpMethod(req.method || 'GET');

	const { path } = req.query;
	const { access_token } = req.cookies;

	let queryString = '';
	if (httpMethod === 'get') {
		delete req.query.path;
		queryString = generateQueryString(req.query);
	}

	const endpoints = (path as [])?.join('/');
	const url = `/${endpoints}?${queryString}`;
	const authorization = req.headers.authorization;

	try {
		const { data } = await axiosInstance.request({
			url,
			method: httpMethod,
			data: req.body,
			headers: {
				Authorization: access_token
					? `Bearer ${access_token}`
					: authorization || ''
			}
		});

		res.status(data?.status || 200).json(data);
	} catch (error) {
		console.log('Error in handler = ', error);
		const { data, status } = (error as any).response || {};
		const keys = data ? Object.keys(data) : null;
		if (keys && typeof keys === 'object' && keys?.length > 0) {
			return res.status(data.status || status || 500).json(data);
		}
		throw error;
	}
}; // End of handler

export default handler;
