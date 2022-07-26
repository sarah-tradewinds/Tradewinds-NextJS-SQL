import create from 'zustand';

export interface CartProduct {
	id: string;
	quantity: number;
}

interface CartState {
	carts: CartProduct[];
	totalCartCount: number;
	subtotal: number;
	addToCart: (productId: string, product?: any) => any;
	removeProductByIdFromCart: (productId: string) => any;
}

export const useCartStore = create<CartState>((set) => ({
	carts: [],
	totalCartCount: 0,
	subtotal: 0,
	addToCart: (productId: string, product?: any) => {
		set(({ carts }) => {
			const cartList = [...carts];
			const productIndex = cartList.findIndex(
				(product) => product.id === productId
			);

			// Adding new product in cart if product is not available in the cart list
			if (productIndex < 0) {
				cartList.push({
					id: productId,
					quantity: 1,
					...product
				});
			} else {
				// Updating product quantity by 1 in cart because product is available in the cart list
				const cartProduct = cartList[productIndex];
				const updatedCartProduct = {
					...cartProduct,
					quantity: cartProduct.quantity + 1,
					...product
				};
				cartList[productIndex] = updatedCartProduct;
			}

			// const newTotalCartCount = cartList.reduce(
			// 	(total, currentProduct) => total + currentProduct.quantity,
			// 	0
			// );

			const { totalQuantity, subtotal } =
				getTotalAmountAndQuantity(cartList);

			return {
				carts: cartList,
				totalCartCount: totalQuantity,
				subtotal
			};
		});
	},
	removeProductByIdFromCart: (productId) => {
		set(({ carts }) => {
			const updatedCarts = carts.filter(
				(product) => product.id !== productId
			);

			const { totalQuantity, subtotal } =
				getTotalAmountAndQuantity(updatedCarts);

			return {
				carts: updatedCarts,
				totalCartCount: totalQuantity,
				subtotal
			};
		});
	}
}));

const getTotalQuantity = (cartList: any[]) => {
	const newTotalCartCount = cartList.reduce(
		(total, currentProduct) => total + currentProduct.quantity,
		0
	);

	return newTotalCartCount || 0;
}; // End of getTotalQuantity function

const getTotalAmountAndQuantity = (cartList: any[]) => {
	let totalQuantity = 0;
	let subtotal = 0;
	for (const cart of cartList) {
		const { quantity, price } = cart;
		totalQuantity += quantity;
		subtotal += quantity * price;
	}

	return { totalQuantity, subtotal };
}; // End of getTotalAmountAndQuantity function
