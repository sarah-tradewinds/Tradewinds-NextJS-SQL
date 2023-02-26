import {
	axiosInstance,
	proxyAxiosInstance
} from 'utils/axios-instance.utils';

interface CreateOrder {
	order_items: any[];
	shipping_address?: string | null;
	billing_address?: string | null;
}

export const createOrder = async (orderPayload: CreateOrder) => {
	try {
		if (!orderPayload.billing_address) {
			orderPayload.billing_address = orderPayload.shipping_address;
		}
		if (!orderPayload.shipping_address) {
			orderPayload.shipping_address = orderPayload.billing_address;
		}

		const { data } = await proxyAxiosInstance.post(
			'/order/live-buy',
			orderPayload
		);

		return data.data?.id || '';
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
		const { data } = await axiosInstance.get(
			`/order/checkout/${orderId}`
		);

		let orderData = data.data || {};

		const invoice = orderData?.edges?.invoice || {};
		orderData = {
			order_number: orderData?.order_number,
			shipping_address: orderData?.shipping_address,
			billing_address: orderData?.billing_address,
			order_items: invoice?.items || [],

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
		const { data } = await proxyAxiosInstance.get(
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
