import { getCustomerDetails } from 'lib/customer/auth.lib';
import { NextApiHandler } from 'next';

// Third party packages

const autoLoginHandler: NextApiHandler = async (req, res) => {
	const {
		access_token,
		access_token_expire_in,
		refresh_token,
		refresh_token_expire_in
	} = req.cookies;

	// return;

	const initialCustomerData = {
		userId: '',
		buyerId: '',
		name: '',
		email: '',
		tradewinds_email: '',
		phone: '',
		access: {
			token: '',
			expireIn: ''
		},
		refresh: {
			token: '',
			expireIn: ''
		}
	};

	try {
		if (!access_token || !access_token) {
			return res.json({
				isLoggedIn: false,
				customerData: initialCustomerData
			});
		}

		const currentDate = new Date();
		const accessTokenExpireIn = new Date(
			(access_token_expire_in || '')?.toString()
		);
		const isAccessTokenExpired =
			new Date(accessTokenExpireIn) <= currentDate;
		const refreshTokenExpireIn = new Date(
			(refresh_token_expire_in || '')?.toString()
		);
		const isRefreshTokenExpired =
			new Date(refreshTokenExpireIn) <= currentDate;

		if (isAccessTokenExpired || isRefreshTokenExpired) {
			return res.json({
				isLoggedIn: false,
				customerData: initialCustomerData
			});
		}

		const customerDetails = await getCustomerDetails(access_token);
		console.log('customerDetails=customerDetails', customerDetails);

		// Setting access token
		initialCustomerData.access.token = access_token;
		initialCustomerData.access.expireIn = accessTokenExpireIn
			.getMinutes()
			.toString();

		// Setting refresh token
		initialCustomerData.refresh.token = refresh_token || '';
		initialCustomerData.refresh.expireIn = refreshTokenExpireIn
			.getMinutes()
			.toString();

		res.status(200).json({
			isLoggedIn: true,
			customerData: { ...initialCustomerData, ...customerDetails }
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

export default autoLoginHandler;
