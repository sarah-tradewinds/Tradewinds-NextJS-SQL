import { addProductToCart, getCart, updateCart } from 'lib/cart.lib';
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
	addToCart: (productId: string, product?: any) => any;
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
	addToCart: async (productId: string, product?: any) => {
		// This should be taken from token by backend team
		const buyerId = product.buyer_id;

		set(({ id, totalCartProductQuantity, cartProducts }) => {
			const cartList: CartProduct[] = [...(cartProducts || [])];
			const productIndex = cartList.findIndex(
				(cartProduct) => cartProduct.product?.id === productId
			);

			const { inventory } = product;
			const minimumOrderQuantity =
				inventory?.minimum_order_quantity || 0;

			// Adding new product in cart if product is not available in the cart list
			if (productIndex < 0) {
				const quantity = minimumOrderQuantity || 1;
				cartList.push({
					quantity,
					product: product || {},
					total: product.product_price * quantity
				});
			} else {
				// Updating product quantity by 1 in cart because product is available in the cart list
				const cartProduct = cartList[productIndex];

				const updatedQuantity = cartProduct.quantity + 1;
				const total =
					cartProduct.product.product_price * updatedQuantity;

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

			// Sending request when buyer Id is available
			if (!totalCartProductQuantity) {
				addProductToCart(buyerId, {
					product_id: productId,
					variant_id: product?.variant_id,
					quantity: 1
				});
			} else {
				updateCart(
					id,
					buyerId,
					cartList.map((cartProduct) => ({
						product_id: cartProduct.product?.id,
						variant_id: cartProduct.product?.variant_id,
						quantity: cartProduct.quantity
					}))
				);
			}

			return {
				cartProducts: cartList,
				totalCartProductQuantity: totalQuantity,
				subtotal
			};
		});
	},
	updateQuantityByProductId: (quantity, productId, buyerId) => {
		set(({ id, cartProducts }) => {
			const updatedCart: CartProduct[] = cartProducts.map(
				(cartProduct) => {
					if (cartProduct.product.id === productId) {
						cartProduct.quantity = quantity;
						cartProduct.total =
							cartProduct.product.product_price * quantity;
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
			const { quantity, product } = cart;
			totalQuantity += +quantity;
			subtotal += +quantity * product.product_price;
		}
	}

	return { totalQuantity, subtotal };
}; // End of getTotalAmountAndQuantity function
