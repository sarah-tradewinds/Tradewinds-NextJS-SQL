import { NextApiHandler } from 'next';

// Third party packages
import axios from 'axios';
import { serialize } from 'cookie';

const handler: NextApiHandler = async (req, res) => {
	const { slug } = req.query;

	console.log(
		req.body,
		`${process.env.API_BASE_URL}/services/api/v1/auth/${slug}`
	);

	try {
		const { data } = await axios.post(
			`${process.env.API_BASE_URL}/services/api/v1/auth/${slug}`,
			req.body
		);

		const { access_token, refresh_token } = data?.data || {};

		if (!access_token || !refresh_token) {
			return res.json(data);
		}

		const cookieOptions = {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			sameSite: true,
			path: '/'
		};

		/**
		 * Access token
		 */
		const accessTokenExpireMin = access_token?.expires_min - 2;
		const accessTokenCookie = serialize(
			'access_token',
			access_token?.token,
			{
				...cookieOptions,
				maxAge: 60 * accessTokenExpireMin
			}
		);
		const accessTokenExpireDate = new Date();
		accessTokenExpireDate.setMinutes(
			accessTokenExpireDate.getMinutes() + accessTokenExpireMin
		);
		const accessTokenExpireInCookie = serialize(
			'access_token_expire_in',
			accessTokenExpireDate.toString(),
			{
				...cookieOptions,
				maxAge: 60 * accessTokenExpireMin
			}
		);

		/**
		 * Refresh Token
		 */
		const refreshTokenExpireMin = refresh_token?.expires_min;
		const refreshTokenCookie = serialize(
			'refresh_token',
			refresh_token?.token,
			{
				...cookieOptions,
				maxAge: 60 * refreshTokenExpireMin
			}
		);
		const refreshTokenExpireDate = new Date();
		refreshTokenExpireDate.setMinutes(
			refreshTokenExpireDate.getMinutes() + refreshTokenExpireMin
		);
		const refreshTokenExpireInCookie = serialize(
			'refresh_token_expire_in',
			refreshTokenExpireDate.toString(),
			{
				...cookieOptions,
				maxAge: 60 * refreshTokenExpireMin
			}
		);

		res.setHeader('Set-Cookie', [
			accessTokenCookie,
			accessTokenExpireInCookie,
			refreshTokenCookie,
			refreshTokenExpireInCookie
		]);

		res.json(data);
	} catch (error) {
		console.log('error =', error);
		const { data } = (error as any).response || {};
		const keys = Object.keys(data);
		if (keys?.length > 0) {
			return res.status(data.status || 500).json(data);
		}
		throw Error((error as any).message);
	}
}; // End of handler

export default handler;
