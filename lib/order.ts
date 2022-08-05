import { serviceAxiosInstance } from 'utils/axios-instance.utils';

interface CreateOrder {
	buyer_id: string;
	order_items: any[];
	type?: 'live_buy';
	shipping_address?: string | null;
	billing_address?: string | null;
}

export const createOrder = async (orderPayload: CreateOrder) => {
	try {
		serviceAxiosInstance.defaults.baseURL = `${process.env.SITE_URL}/api/v1/services/api/v3`;

		orderPayload.type = 'live_buy';

		// TODO: Temporary
		if (!orderPayload.billing_address) {
			orderPayload.billing_address = orderPayload.shipping_address;
		}
		if (!orderPayload.shipping_address) {
			orderPayload.shipping_address = orderPayload.billing_address;
		}

		const { data } = await serviceAxiosInstance.post(
			'/order',
			orderPayload
		);
		serviceAxiosInstance.defaults.baseURL = `${process.env.SITE_URL}/api/v1/services/api/v1`;

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
		serviceAxiosInstance.defaults.baseURL = `${process.env.SITE_URL}/api/v1/services/api/v1`;

		let orderData = data.data || {};
		orderData = {
			order_number: orderData?.order_number,
			shipping_address: orderData?.shipping_address,
			billing_address: orderData?.billing_address,
			order_items: orderData?.order_items || [],

			// charges
			shipping_charge: orderData?.shipping_charge,
			stripe_charge: orderData?.stripe_charge || 0,
			tax: orderData?.tax || 0,

			// total
			sub_total: orderData?.sub_total,
			grand_total: orderData?.grand_total || 0,
			amount_to_pay: orderData?.amount_to_pay || 0
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
		serviceAxiosInstance.defaults.baseURL = `${process.env.SITE_URL}/api/v1/services/api/v1`;

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
