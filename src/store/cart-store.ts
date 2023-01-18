import { getCart, updateCart } from 'lib/cart.lib';
import { getProductPrice } from 'utils/pricing.utils';
import create from 'zustand';

export interface CartProduct {
	product: any;
	total: number;
	quantity: number;
}

interface CartState {
	id: string;
	cartProducts: CartProduct[];
	totalCartProductQuantity: number;
	subtotal: number;
	fetchCart: (buyerId: string) => any;
	setCartId: (cartId: string) => any;
	addToCart: (
		productId: string,
		variantId?: string,
		product?: any
	) => any;
	updateQuantityByProductId: (
		quantity: number,
		productId: string,
		buyerId: string
	) => any;
	removeProductByIdFromCart: (
		productId: string,
		buyerId: string
	) => any;
	resetCartState: () => any;
}

const initialState = {
	id: '',
	cartProducts: [],
	totalCartProductQuantity: 0,
	subtotal: 0
};

export const useCartStore = create<CartState>((set) => ({
	...initialState,
	resetCartState: () => {
		set(initialState);
	},

	fetchCart: async (buyerId) => {
		const cart = await getCart(buyerId);
		const cartProducts = cart.item;

		const { totalQuantity } = getTotalAmountAndQuantity(cartProducts);

		set({
			id: cart.id,
			cartProducts,
			totalCartProductQuantity: totalQuantity,
			subtotal: cart.subtotal || 0
		});
	},
	setCartId: (cartId: string) => set({ id: cartId }),
	addToCart: async (
		productId: string,
		variantId?: string,
		product?: any
	) => {
		let cartList: CartProduct[] = [];
		set(({ id, totalCartProductQuantity, cartProducts }) => {
			cartList = [...(cartProducts || [])];
			const productIndex = cartList.findIndex((cartProduct) => {
				if (variantId) {
					return (
						cartProduct.product?.id === productId &&
						cartProduct.product.variant_id === variantId
					);
				}
				return cartProduct.product?.id === productId;
			});

			const { inventory } = product;
			const minimumOrderQuantity =
				inventory?.minimum_order_quantity || 0;

			// Adding new product in cart if product is not available in the cart list
			if (productIndex < 0) {
				const quantity = minimumOrderQuantity || 1;
				const productPrice = getProductPrice({
					bulkPrices: product?.bulk_pricing || [],
					price: product.product_price,
					quantity,
					salePrice: product.sale_price
				});

				cartList.push({
					quantity,
					product: product || {},
					total: productPrice * quantity
				});
			} else {
				// Updating product quantity by 1 in cart because product is available in the cart list
				const cartProduct = cartList[productIndex];

				const updatedQuantity = cartProduct.quantity + 1;
				const product = cartProduct.product;

				const productPrice = getProductPrice({
					bulkPrices: product?.bulk_pricing || [],
					price: product.product_price,
					salePrice: product.sale_price,
					quantity: updatedQuantity
				});

				const total = productPrice * updatedQuantity;

				const updatedCartProduct = {
					...cartProduct,
					...product,
					quantity: updatedQuantity,
					total
				};

				cartList[productIndex] = updatedCartProduct;
			}

			const { totalQuantity, subtotal } =
				getTotalAmountAndQuantity(cartList);

			return {
				cartProducts: cartList,
				totalCartProductQuantity: totalQuantity,
				subtotal
			};
		});

		return cartList;
	},
	updateQuantityByProductId: (quantity, productId, buyerId) => {
		set(({ id, cartProducts }) => {
			const updatedCart: CartProduct[] = cartProducts.map(
				(cartProduct) => {
					if (cartProduct.product.id === productId) {
						const product = cartProduct.product;
						const productPrice = getProductPrice({
							bulkPrices: product?.bulk_pricing || [],
							price: product.product_price,
							quantity,
							salePrice: product.sale_price
						});

						cartProduct.quantity = quantity;
						cartProduct.total = productPrice * quantity;
					}
					return cartProduct;
				}
			);

			const { totalQuantity, subtotal } =
				getTotalAmountAndQuantity(updatedCart);

			updateCart(
				id,
				buyerId,
				updatedCart.map((cartProduct) => ({
					product_id: cartProduct.product?.id,
					quantity: cartProduct.quantity
				}))
			);

			return {
				cartProducts: updatedCart,
				totalCartProductQuantity: totalQuantity,
				subtotal
			};
		});
	},
	removeProductByIdFromCart: (productId, buyerId) => {
		set(({ id, cartProducts }) => {
			const updatedCarts = cartProducts.filter(
				(cartProduct) => cartProduct.product.id !== productId
			);

			const { totalQuantity, subtotal } =
				getTotalAmountAndQuantity(updatedCarts);

			updateCart(
				id,
				buyerId,
				updatedCarts.map((cartProduct) => ({
					product_id: cartProduct.product?.id,
					quantity: cartProduct.quantity
				}))
			);

			return {
				cartProducts: updatedCarts,
				totalCartProductQuantity: totalQuantity,
				subtotal
			};
		});
	}
}));

const getTotalAmountAndQuantity = (cartList: CartProduct[]) => {
	let totalQuantity = 0;
	let subtotal = 0;
	if (cartList) {
		for (const cart of cartList) {
			const { quantity } = cart;
			totalQuantity += +quantity;
			subtotal += cart.total;
		}
	}

	return { totalQuantity, subtotal };
}; // End of getTotalAmountAndQuantity function
