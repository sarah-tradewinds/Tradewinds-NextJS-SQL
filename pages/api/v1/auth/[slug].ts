import { NextApiHandler } from 'next';

// Third party packages
import { serialize } from 'cookie';
import { axiosInstance } from 'utils/axios-instance.utils';

const handler: NextApiHandler = async (req, res) => {
	const { slug } = req.query;

	const { access_token } = req.cookies;
	const authorization = req.headers.authorization;

	try {
		const { data } = await axiosInstance.post(
			`/auth/${slug}`,
			req.body,
			{
				headers: {
					Authorization: access_token
						? `Bearer ${access_token}`
						: authorization || ''
				}
			}
		);
		const {
			access_token: loginAccessToken,
			refresh_token: loginRefreshToken
		} = data?.data || {};

		if (!loginAccessToken || !loginRefreshToken) {
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
		const accessTokenExpireMin = loginAccessToken?.expires_min - 2;
		const accessTokenCookie = serialize(
			'access_token',
			loginAccessToken?.token,
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
			accessTokenExpireDate.toJSON(),
			{
				...cookieOptions,
				maxAge: 60 * accessTokenExpireMin
			}
		);

		/**
		 * Refresh Token
		 */
		const refreshTokenExpireMin = loginRefreshToken?.expires_min;
		const refreshTokenCookie = serialize(
			'refresh_token',
			loginRefreshToken?.token,
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
			refreshTokenExpireDate.toJSON(),
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
