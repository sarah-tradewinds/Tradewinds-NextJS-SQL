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
	totalCartCount: number;
	subtotal: number;
	fetchCart: () => any;
	addToCart: (productId: string, product?: any) => any;
	updateQuantityByProductId: (
		quantity: number,
		productId: string
	) => any;
	removeProductByIdFromCart: (productId: string) => any;
}

export const useCartStore = create<CartState>((set) => ({
	id: '',
	cartProducts: [],
	totalCartCount: 0,
	subtotal: 0,
	fetchCart: async () => {
		const cart = await getCart('62b453142f60be1e439617ac');
		const cartProducts = cart.item;

		const { totalQuantity } = getTotalAmountAndQuantity(cartProducts);

		set({
			id: cart.id,
			cartProducts,
			totalCartCount: totalQuantity,
			subtotal: cart.subtotal || 0
		});
	},
	addToCart: async (productId: string, product?: any) => {
		set(({ id, totalCartCount, cartProducts }) => {
			const cartList: CartProduct[] = [...(cartProducts || [])];
			const productIndex = cartList.findIndex(
				(cartProduct) => cartProduct.product?.id === productId
			);

			// Adding new product in cart if product is not available in the cart list
			if (productIndex < 0) {
				cartList.push({
					quantity: 1,
					product: product || {},
					total: product.product_price
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

			if (!totalCartCount) {
				addProductToCart('62b453142f60be1e439617ac', {
					product_id: productId,
					quantity: 1
				});
			} else {
				updateCart(
					id,
					'62b453142f60be1e439617ac',
					cartList.map((cartProduct) => ({
						product_id: cartProduct.product?.id,
						quantity: cartProduct.quantity
					}))
				);
			}

			return {
				cartProducts: cartList,
				totalCartCount: totalQuantity,
				subtotal
			};
		});
	},
	updateQuantityByProductId: (quantity, productId) => {
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
				'62b453142f60be1e439617ac',
				updatedCart.map((cartProduct) => ({
					product_id: cartProduct.product?.id,
					quantity: cartProduct.quantity
				}))
			);

			return {
				cartProducts: updatedCart,
				totalCartCount: totalQuantity,
				subtotal
			};
		});
	},
	removeProductByIdFromCart: (productId) => {
		set(({ id, cartProducts }) => {
			const updatedCarts = cartProducts.filter(
				(cartProduct) => cartProduct.product.id !== productId
			);

			const { totalQuantity, subtotal } =
				getTotalAmountAndQuantity(updatedCarts);

			updateCart(
				id,
				'62b453142f60be1e439617ac',
				updatedCarts.map((cartProduct) => ({
					product_id: cartProduct.product?.id,
					quantity: cartProduct.quantity
				}))
			);

			return {
				cartProducts: updatedCarts,
				totalCartCount: totalQuantity,
				subtotal
			};
		});
	}
}));

const getTotalAmountAndQuantity = (cartList: CartProduct[]) => {
	let totalQuantity = 0;
	let subtotal = 0;
	for (const cart of cartList) {
		const { quantity, product } = cart;
		totalQuantity += +quantity;
		subtotal += +quantity * product.product_price;
	}

	return { totalQuantity, subtotal };
}; // End of getTotalAmountAndQuantity function
