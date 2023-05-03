import { updateCart } from 'lib/cart.lib';
import { getDefaultProductAndProductVariants } from 'utils/common.util';
import { getProductPrice } from 'utils/pricing.utils';
import create from 'zustand';

export interface ICartItem {
	productVariantId: string;
	total: number;
	quantity: number;
	product: any;
}

interface CartState {
	id?: string;
	cartItems: ICartItem[];
	totalAmount: number;
	totalItem: number;
	setCart: (
		id: string,
		cartItems: ICartItem[],
		totalAmount: number,
		totalItem: number
	) => any;
	addProductVariantToCart: (
		productVariantId: string,
		product?: any
	) => any;
	updateProductVariantInCart: (
		productVariantId: string,
		quantity: number
	) => any;
	removeProductVariantByProductVariantIdFromCart: (
		productVariantId: string
	) => any;
	resetCart: () => any;
}

const initialState = {
	id: '',
	cartItems: [],
	totalAmount: 0,
	totalItem: 0
};

export const useCartStore = create<CartState>((set) => ({
	...initialState,

	setCart: (id, cartItems, totalAmount, totalItem) => {
		set({
			id,
			cartItems,
			totalAmount,
			totalItem
		});
	},

	// Adding new product to cart
	addProductVariantToCart: (productVariantId, product) => {
		const { defaultVariant } = getDefaultProductAndProductVariants(
			product?.edges?.product_variants || []
		);

		set(({ cartItems, totalAmount }) => {
			const cartItem = cartItems?.find((cartItem) => {
				return cartItem.productVariantId === productVariantId;
			});

			// Adding new product in cart if product is not available in the cart list
			if (!cartItem) {
				const minimumOrderQuantity =
					defaultVariant?.inventory?.minimum_order_quantity || 1;
				const productData = {
					...defaultVariant,
					...product,
					product_variant_id: productVariantId
				};

				const productPrice = getProductPrice({
					bulkPrices: defaultVariant?.bulk_pricing || [],
					price: defaultVariant?.retail_price || 0,
					salePrice: defaultVariant?.sales_price || 0,
					quantity: 1
				});
				const cartItemPrice = productPrice * minimumOrderQuantity;
				const newCartItem = {
					productVariantId,
					quantity: minimumOrderQuantity,
					total: cartItemPrice,
					product: productData || {}
				};

				const updatedCartItems = cartItems
					? [...cartItems, newCartItem]
					: [newCartItem];

				updateCart(updatedCartItems);
				return {
					cartItems: updatedCartItems,
					totalItem: updatedCartItems.length,
					totalAmount: totalAmount + cartItemPrice
				};
			}

			let updatedTotalAmount = 0;
			const updatedCartItems = cartItems?.map((cartItem) => {
				if (cartItem.productVariantId === productVariantId) {
					const updatedQuantity = cartItem.quantity + 1;
					cartItem.quantity = updatedQuantity;

					const productPrice = getProductPrice({
						bulkPrices: defaultVariant?.bulk_pricing || [],
						price: defaultVariant?.retail_price || 0,
						salePrice: defaultVariant?.sales_price || 0,
						quantity: updatedQuantity
					});
					const cartItemPrice = productPrice * updatedQuantity;
					cartItem.total = cartItemPrice;
				}

				updatedTotalAmount += cartItem.total;
				return cartItem;
			});

			updateCart(updatedCartItems);
			return {
				cartItems: updatedCartItems,
				totalItem: updatedCartItems.length,
				totalAmount: updatedTotalAmount
			};
		});
		// return cartList;
	}, // End of addProductVariantToCart method

	// Update matching product in cart
	updateProductVariantInCart: (productVariantId, quantity) => {
		set(({ cartItems }) => {
			let updatedTotalAmount = 0;
			const updatedCartItems = cartItems?.map((cartItem) => {
				if (cartItem.productVariantId === productVariantId) {
					const productVariants =
						cartItem.product?.edges?.product_variants ||
						cartItem.product?.edges?.product?.edges?.product_variants ||
						[];

					const productVariant = productVariants?.find(
						(productVariant: any) =>
							productVariant.id === productVariantId
					);

					console.log('[updateProductVariantInCart] =', {
						productVariant,
						cartItems,
						productVariants,
						productVariantId
					});

					const productPrice = getProductPrice({
						bulkPrices: productVariant?.bulk_pricing || [],
						price: productVariant?.retail_price || 0,
						salePrice: productVariant?.sales_price || 0,
						quantity
					});

					cartItem.quantity = quantity;

					const cartItemPrice = productPrice * quantity;
					cartItem.total = cartItemPrice;
				}

				updatedTotalAmount += cartItem.total;
				return cartItem;
			});

			updateCart(updatedCartItems);

			return {
				cartItems: updatedCartItems,
				totalItem: updatedCartItems.length,
				totalAmount: updatedTotalAmount
			};
		});
	}, // End of updateProductVariantInCart method

	// Remove matching product from cart
	removeProductVariantByProductVariantIdFromCart: (
		productVariantId
	) => {
		set(({ cartItems }) => {
			let updatedTotalAmount = 0;
			const updatedCartItems = cartItems?.filter((cartItem) => {
				if (cartItem.productVariantId !== productVariantId) {
					updatedTotalAmount += cartItem.total;
					return cartItem;
				}
			});

			updateCart(updatedCartItems);
			return {
				cartItems: updatedCartItems,
				totalItem: updatedCartItems.length,
				totalAmount: updatedTotalAmount
			};
		});
	}, // End of removeProductVariantByProductVariantIdFromCart method

	// Resetting cart state
	resetCart: () => {
		set(() => initialState);
		updateCart([]);
	}
}));
