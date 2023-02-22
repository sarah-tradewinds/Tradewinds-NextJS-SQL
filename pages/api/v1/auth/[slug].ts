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

		console.log('loginRefreshToken =', loginRefreshToken);

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
		// const accessTokenExpireAt = loginAccessToken?.expires_at - 2;
		const accessTokenExpireAt = loginAccessToken?.expires_at;
		const accessTokenCookie = serialize(
			'access_token',
			loginAccessToken?.token,
			{
				...cookieOptions,
				// maxAge: 60 * accessTokenExpireAt
				expires: new Date(accessTokenExpireAt)
			}
		);
		// const accessTokenExpireDate = new Date();
		// accessTokenExpireDate.setMinutes(
		// 	accessTokenExpireDate.getMinutes() + accessTokenExpireAt
		// );
		// const accessTokenExpireInCookie = serialize(
		// 	'access_token_expire_in',
		// 	accessTokenExpireDate.toJSON(),
		// 	{
		// 		...cookieOptions,
		// 		// maxAge: 60 * accessTokenExpireAt
		// 		expires: new Date(accessTokenExpireAt)
		// 	}
		// );

		/**
		 * Refresh Token
		 */
		const refreshTokenExpireAt = loginRefreshToken?.expires_at;
		const refreshTokenCookie = serialize(
			'refresh_token',
			loginRefreshToken?.token,
			{
				...cookieOptions,
				// maxAge: 60 * refreshTokenExpireAt
				expires: new Date(refreshTokenExpireAt)
			}
		);
		// const refreshTokenExpireDate = new Date();
		// refreshTokenExpireDate.setMinutes(
		// 	refreshTokenExpireDate.getMinutes() + refreshTokenExpireAt
		// );
		// const refreshTokenExpireInCookie = serialize(
		// 	'refresh_token_expire_in',
		// 	refreshTokenExpireDate.toJSON(),
		// 	{
		// 		...cookieOptions,
		// 		maxAge: 60 * refreshTokenExpireAt
		// 	}
		// );

		res.setHeader('Set-Cookie', [
			accessTokenCookie,
			// accessTokenExpireInCookie,
			refreshTokenCookie
			// refreshTokenExpireInCookie
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
