import { NextApiHandler } from 'next';

// Third party packages
import axios from 'axios';

// utils
import { getHttpMethod } from 'utils/get_method.utils';

const handler: NextApiHandler = async (req, res) => {
	const httpMethod = getHttpMethod(req.method || 'GET');

	const { path } = req.query;
	const { access_token } = req.cookies;

	const endpoints = (path as [])?.join('/');
	const url = `${process.env.API_BASE_URL}/${endpoints}`;

	try {
		const { data } = await axios[httpMethod](url, {
			data: req.body,
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		});

		res.json(data);
	} catch (error) {
		const { data } = (error as any).response || {};
		const keys = Object.keys(data);
		console.log(typeof data);
		if (typeof keys === 'object' && keys?.length > 0) {
			return res.status(data.status || 500).json(data);
		}
		throw error;
	}
}; // End of handler

export default handler;
