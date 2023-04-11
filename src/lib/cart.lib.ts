import { ICartItem } from 'store/cart-store-v2';
import { axiosInstance } from 'utils/axios-instance.utils';
import { getProductPrice } from 'utils/pricing.utils';

interface CartProduct {
	product_variant_id?: string;
	quantity: number;
}

// export const addProductToCart = async (
// 	productVariantId: string,
// 	quantity: number
// ): Promise<string> => {
// 	try {
// 		// const { data } = await proxyAxiosInstance.patch('/cart', [
// 		// 	{
// 		// 		product_variant_id: productVariantId,
// 		// 		quantity
// 		// 	}
// 		// ]);

// 		const { data } = await axiosInstance.patch('/cart', [
// 			{
// 				product_variant_id: productVariantId,
// 				quantity
// 			}
// 		]);

// 		console.log('data =', data);
// 		console.log('data?.data =', data?.data);

// 		// Returning cartId
// 		return data?.data?.InsertedID;
// 	} catch (error) {
// 		console.log('[addProductToCart] =', error);
// 		const { data } = (error as any).response || {};
// 		// throw Error(data || 'Error occurred addProductToCart');
// 		return '';
// 	}
// }; // End of addProductToCart function

export const getCart = async () => {
	try {
		const { data } = await axiosInstance.get('cart');

		let subtotal = 0;
		const cartItem =
			data?.data?.edges?.cart_items?.map((item: any) => {
				const quantity = item.quantity;
				const productVariant = item?.edges?.product_variant?.[0] || {};

				const productPrice =
					getProductPrice({
						bulkPrices: productVariant?.bulk_pricing || [],
						price: productVariant?.retail_price || 0,
						salePrice: productVariant?.sales_price || 0,
						quantity
					}) || 0;

				const productVariantId = productVariant?.id;
				const productData = {
					...productVariant?.edges?.product,
					...productVariant,
					product_variant_id: productVariantId
				};

				const total = productPrice * quantity || 0;
				subtotal += total;
				return {
					product: productData,
					productVariantId,
					quantity,
					total
				};
			}) || [];

		data.data.item = cartItem || [];
		data.data.subtotal = subtotal;
		return data.data || {};
	} catch (error) {
		console.log('[getCart] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getCart');
		return {};
	}
}; // End of getCart function

export const updateCart = async (products: ICartItem[]) => {
	try {
		const { data } = await axiosInstance.patch(
			'cart',
			products?.map((cartItem) => ({
				product_variant_id: cartItem.productVariantId,
				quantity: cartItem.quantity
			}))
		);

		return '';
	} catch (error) {
		console.log('[updateCart] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred updateCart');
		return {};
	}
}; // End of updateCart function
