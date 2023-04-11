import {
	generateQueryString,
	generateQueryStringBDM,
	generateQueryStringSeller
} from 'utils/generate_query_string.utils';

export const BUYER_DASHBOARD_PAGES = {
	buyer_rfq: 'buyer-rfq',
	buyers: 'buyers',
	message_vendor: 'message-vendor'
};

export const SELLER_DASHBOARD_PAGES = {
	sellers: 'sellers'
};

export const BDM_DASHBOARD_PAGES = {
	bdms: 'bdms'
};

export const BUYER_DASHBOARD_ACTIONS = {
	create_rfq: 'create-rfq',
	message_vendor: 'message-vendor'
};

export const generateBuyerDashboardUrl = (paramsData: object) => {
	const queryString = generateQueryString(paramsData);
	const url = `${process.env.BUYER_DASHBOARD_SITE_URL}/app/buyers?role=buyer&${queryString}`;
	return url;
};

export const generateSellerDashboardUrl = (paramsData: object) => {
	const queryString = generateQueryStringSeller(paramsData);
	const url = `${process.env.SELLER_DASHBOARD_SITE_URL}/app/profile?role=seller&${queryString}`;
	return url;
};

export const generateBdmDashboardUrl = (paramsData: object) => {
	const queryString = generateQueryStringBDM(paramsData);
	const url = `${process.env.BDM_DASHBOARD_SITE_URL}/app/profile?role=bdm&${queryString}`;
	return url;
};
