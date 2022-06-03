import { NextApiHandler } from 'next';

// Third party packages
import { serialize } from 'cookie';

const logoutHandler: NextApiHandler = async (req, res) => {
	const cookieOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: true,
		path: '/'
	};

	try {
		/**
		 * Access token
		 */
		const accessTokenCookie = serialize('access_token', '', {
			...cookieOptions,
			maxAge: 0
		});
		const accessTokenExpireInCookie = serialize(
			'access_token_expire_in',
			'',
			{
				...cookieOptions,
				maxAge: 0
			}
		);

		/**
		 * Refresh Token
		 */
		const refreshTokenCookie = serialize('refresh_token', '', {
			...cookieOptions,
			maxAge: 0
		});
		const refreshTokenExpireInCookie = serialize(
			'refresh_token_expire_in',
			'',
			{
				...cookieOptions,
				maxAge: 0
			}
		);

		res.setHeader('Set-Cookie', [
			accessTokenCookie,
			accessTokenExpireInCookie,
			refreshTokenCookie,
			refreshTokenExpireInCookie
		]);

		res.json({
			message: 'Logout successfully'
		});
	} catch (error) {
		console.log('error =', error);
		const { data } = (error as any).response || {};
		const keys = Object.keys(data);
		if (keys?.length > 0) {
			return res.status(data.status || 500).json(data);
		}
		throw Error((error as any).message);
	}
}; // End of logoutHandler

export default logoutHandler;
