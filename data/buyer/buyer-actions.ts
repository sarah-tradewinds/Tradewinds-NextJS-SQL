import { generateQueryString } from 'utils/generate_query_string.utils';

export const BUYER_DASHBOARD_PAGES = {
	buyer_rfq: 'buyer-rfq',
	buyers: 'buyers',
	message_vendor: 'message-vendor'
};

export const BUYER_DASHBOARD_ACTIONS = {
	create_rfq: 'create-rfq',
	message_vendor: 'message-vendor'
};

export const generateBuyerDashboardUrl = (paramsData: object) => {
	const queryString = generateQueryString(paramsData);
	const url = `${process.env.BUYER_DASHBOARD_SITE_URL}/index.html#/app/buyers?${queryString}`;
	return url;
};
