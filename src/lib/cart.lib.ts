import { proxyAxiosInstance } from 'utils/axios-instance.utils';

interface CartProduct {
	product_id: string;
	variant_id?: string;
	quantity: number;
}

export const addProductToCart = async (
	buyerId: string,
	product?: CartProduct | null,
	products?: CartProduct[] | null
): Promise<string> => {
	try {
		const { data } = await proxyAxiosInstance.post('/addtocart', {
			buyer_id: buyerId,
			item: product ? [product] : products,
			discount: 0
		});

		// Returning cartId
		return data?.data?.InsertedID;
	} catch (error) {
		console.log('[addProductToCart] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred addProductToCart');
		return '';
	}
}; // End of addProductToCart function

export const getCart = async (buyerId: string) => {
	try {
		const { data } = await proxyAxiosInstance.get(
			`addtocart/cart/${buyerId}`
		);

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
	buyerId: string,
	products: CartProduct[]
) => {
	try {
		const { data } = await proxyAxiosInstance.put(
			`addtocart/update/${cartId}`,
			{
				buyer_id: buyerId,
				item: products,
				discount: 0
			}
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
