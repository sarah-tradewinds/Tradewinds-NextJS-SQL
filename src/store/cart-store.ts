import { getCart, updateCart } from 'lib/cart.lib';
import { getProductPrice } from 'utils/pricing.utils';
import create from 'zustand';

export interface CartProduct {
	productVariantId: string;
	total: number;
	quantity: number;
	product: any;
}

interface CartState {
	id: string;
	cartProducts: CartProduct[];
	totalCartProductQuantity: number;
	subtotal: number;
	fetchCart: () => any;
	setCartId: (cartId: string) => any;
	addToCart: (
		productVariantId: string,
		quantity: number,
		product?: any
	) => any;
	// addToCart: (
	// 	productId: string,
	// 	variantId?: string,
	// 	product?: any
	// ) => any;
	updateQuantityByProductVariantId: (
		productVariantId: string,
		quantity: number
	) => any;
	removeProductByProductVariantIdFromCart: (
		productVariantId: string
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

	fetchCart: async () => {
		const cart = await getCart();
		if (cart?.item) {
			const cartProducts = cart.item;
			localStorage.setItem('cart', JSON.stringify(cartProducts));

			const { totalQuantity } = getTotalAmountAndQuantity(cartProducts);

			set({
				id: cart.id,
				cartProducts,
				totalCartProductQuantity: totalQuantity,
				subtotal: cart.subtotal || 0
			});
		} else {
			const rawCart = localStorage.getItem('cart');
			const cartData = JSON.parse(rawCart || '{}');
			set({ ...cartData });
		}
	},
	setCartId: (cartId: string) => set({ id: cartId }),

	addToCart: async (
		productVariantId: string,
		quantity,
		product?: any
	) => {
		let cartList: CartProduct[] = [];
		set(({ cartProducts }) => {
			cartList = [...(cartProducts || [])];

			const productIndex = cartList.findIndex((cartProduct) => {
				return cartProduct.productVariantId === productVariantId;
			});

			// Adding new product in cart if product is not available in the cart list
			if (productIndex < 0) {
				const productVariant =
					product?.edges?.product_variants?.find(
						(variant: any) => variant?.id === productVariantId
					) || {};

				const quantity =
					productVariant?.inventory?.minimum_order_quantity || 1;

				const productPrice = getProductPrice({
					bulkPrices: productVariant?.bulk_pricing || [],
					price: productVariant?.retail_price || 0,
					salePrice: productVariant?.sales_price || 0,
					quantity
				});

				console.log('[addToCart] productPrice', productPrice, {
					bulkPrices: productVariant?.bulk_pricing || [],
					price: productVariant?.retail_price || 0,
					salePrice: productVariant?.sales_price || 0,
					quantity
				});

				const productData = {
					...productVariant,
					...product,
					product_variant_id: productVariantId
				};

				console.log('productData =productData', productData);

				cartList.push({
					productVariantId,
					quantity,
					product: productData || {},
					total: productPrice * quantity
				});
			} else {
				// Updating product quantity by 1 in cart because product is available in the cart list
				const cartProduct = cartList[productIndex];
				const updatedQuantity = cartProduct.quantity + 1;
				const product = cartProduct.product;
				const productVariant =
					product?.edges?.product_variants?.find(
						(productVariant: any) =>
							productVariant.id === productVariantId
					) || {};

				const productPrice = getProductPrice({
					bulkPrices: productVariant?.bulk_pricing || [],
					price: productVariant?.retail_price || 0,
					salePrice: productVariant?.sales_price || 0,
					quantity: updatedQuantity
				});

				console.log('[addToCart] update productPrice', productPrice);

				const total = productPrice * updatedQuantity;

				const productData = {
					...productVariant,
					...product,
					product_variant_id: productVariantId
				};
				const updatedCartProduct = {
					...cartProduct,
					...productData,
					quantity: updatedQuantity,
					total
				};

				cartList[productIndex] = updatedCartProduct;
			}
			const { totalQuantity, subtotal } =
				getTotalAmountAndQuantity(cartList);

			const cartData = {
				cartProducts: cartList,
				totalCartProductQuantity: totalQuantity,
				subtotal
			};

			localStorage.setItem('cart', JSON.stringify(cartData));

			return cartData;
		});
		return cartList;
	},
	updateQuantityByProductVariantId: (productVariantId, quantity) => {
		set(({ cartProducts }) => {
			const updatedCart: CartProduct[] = cartProducts.map(
				(cartProduct) => {
					if (cartProduct.productVariantId === productVariantId) {
						const product = cartProduct.product;
						const productVariant =
							product?.edges?.product_variants?.find(
								(productVariant: any) =>
									productVariant.id === productVariantId
							) || {};

						const productPrice = getProductPrice({
							bulkPrices: productVariant?.bulk_pricing || [],
							price: productVariant?.retail_price || 0,
							salePrice: productVariant?.sales_price || 0,
							quantity: quantity
						});

						cartProduct.quantity = quantity;
						cartProduct.total = productPrice * quantity;
					}

					return cartProduct;
				}
			);

			console.log(
				'[updateQuantityByProductVariantId] updatedCart =',
				updatedCart
			);

			const { totalQuantity, subtotal } =
				getTotalAmountAndQuantity(updatedCart);

			updateCart(
				updatedCart.map((cartProduct) => ({
					product_variant_id: productVariantId,
					quantity: cartProduct.quantity
				}))
			);

			const cartData = {
				cartProducts: updatedCart,
				totalCartProductQuantity: totalQuantity,
				subtotal
			};

			localStorage.setItem('cart', JSON.stringify(cartData));

			return cartData;
		});
	},
	removeProductByProductVariantIdFromCart: (productVariantId) => {
		set(({ id, cartProducts }) => {
			const updatedCarts = cartProducts.filter(
				(cartProduct) =>
					cartProduct.productVariantId !== productVariantId
			);

			const { totalQuantity, subtotal } =
				getTotalAmountAndQuantity(updatedCarts);

			updateCart(
				updatedCarts.map((cartProduct) => ({
					product_variant_id: productVariantId,
					quantity: cartProduct.quantity
				}))
			);

			const cartData = {
				cartProducts: updatedCarts,
				totalCartProductQuantity: totalQuantity,
				subtotal
			};

			localStorage.setItem('cart', JSON.stringify(cartData));

			return cartData;
		});
	}
}));

const getTotalAmountAndQuantity = (cartList: CartProduct[]) => {
	let totalQuantity = 0;
	let subtotal = 0;
	if (cartList) {
		console.log('cartListcartListcartListcartList =', cartList);
		for (const cart of cartList) {
			const { quantity } = cart;
			totalQuantity += +quantity;
			subtotal += cart.total;
		}
	}

	return { totalQuantity, subtotal };
}; // End of getTotalAmountAndQuantity function
