import { proxyAxiosInstance } from 'utils/axios-instance.utils';

interface CartProduct {
	product_variant_id?: string;
	quantity: number;
}

export const addProductToCart = async (
	productVariantId: string,
	quantity: number
): Promise<string> => {
	try {
		const { data } = await proxyAxiosInstance.post('/cart', [
			{
				product_variant_id: productVariantId,
				quantity
			}
		]);

		console.log('data =', data);
		console.log('data?.data =', data?.data);

		// Returning cartId
		return data?.data?.InsertedID;
	} catch (error) {
		console.log('[addProductToCart] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred addProductToCart');
		return '';
	}
}; // End of addProductToCart function

export const getCart = async () => {
	try {
		const { data } = await proxyAxiosInstance.get('cart');

		const cartItem =
			data?.data?.item?.map((item: any) => ({
				product: item.product_id,
				quantity: item.quantity,
				total: item.total
			})) || [];

		data.data.item = cartItem || [];
		console.log('data.data =', data.data);
		return data.data || {};
	} catch (error) {
		console.log('[getCart] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getCart');
		return {};
	}
}; // End of getCart function

export const updateCart = async (
	cartId: string,
	products: CartProduct[]
) => {
	try {
		const { data } = await proxyAxiosInstance.patch(
			`cart/${cartId}`,
			products
		);
		console.log(data);

		return '';
	} catch (error) {
		console.log('[updateCart] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred updateCart');
		return {};
	}
}; // End of updateCart function
