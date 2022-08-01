import { serviceAxiosInstance } from 'utils/axios-instance.utils';

interface CreateOrder {
	buyer_id: string;
	// order_by_sellers: any[];
	order_items: any[];
	type?: 'live_buy';
	shipping_address?: string;
	billing_address?: string;
}

export const createOrder = async (orderPayload: CreateOrder) => {
	try {
		serviceAxiosInstance.defaults.baseURL = `${process.env.SITE_URL}/api/v1/services/api/v3`;

		orderPayload.type = 'live_buy';
		orderPayload.shipping_address = '62e3e776e6212b367d9c5d2e';
		orderPayload.billing_address = '62e3e776e6212b367d9c5d2e';
		const { data } = await serviceAxiosInstance.post(
			'/order',
			orderPayload
		);
		return data.data?.InsertedID || '';
	} catch (error) {
		console.log('[createOrder] =', error);
		const { data, status } = (error as any).response || {};
		// if (status >= 500) {
		// 	throw Error('Error occurred in createOrder');
		// }
		return '';
	}
}; // End of createOrder

export const getOrderById = async (orderId: string) => {
	try {
		serviceAxiosInstance.defaults.baseURL = `${process.env.SITE_URL}/api/v1/services/api/v3`;

		const { data } = await serviceAxiosInstance.get(
			`/order/${orderId}`
		);

		let orderData = data.data || {};
		orderData = {
			order_number: orderData?.order_number,
			shipping_address: orderData?.shipping_address,
			billing_address: orderData?.billing_address,
			order_items: orderData?.order_items || [],
			shipping_charge: orderData?.shipping_charge,
			sub_total: orderData?.sub_total,
			amount_to_pay: orderData?.amount_to_pay,
			tax: orderData?.tax
		};

		return orderData;
	} catch (error) {
		console.log('[getOrderById] =', error);
		const { data, status } = (error as any).response || {};
		// if (status >= 500) {
		// 	throw Error('Error occurred in getOrderById');
		// }
		return {};
	}
}; // End of getOrderById

export const getPaymentIntentByOrderId = async (orderId: string) => {
	try {
		serviceAxiosInstance.defaults.baseURL = `${process.env.SITE_URL}/api/v1/services/api/v3`;

		const { data } = await serviceAxiosInstance.get(
			`/order/checkout/${orderId}`
		);

		const clientSecret = data.response?.client_secret || '';
		return clientSecret;
	} catch (error) {
		console.log('[getPaymentIntentByOrderId] =', error);
		const { data, status } = (error as any).response || {};
		// if (status >= 500) {
		// 	throw Error('Error occurred in getPaymentIntentByOrderId');
		// }
		return '';
	}
}; // End of getPaymentIntentByOrderId
