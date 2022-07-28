import { GetStaticProps, NextPage } from 'next';

import CartList from 'components/website/cart/cart-list';
import Button from 'components/website/common/form/button';

// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// store
import { createOrder } from 'lib/order';
import { useRouter } from 'next/router';
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store';

const CartPage: NextPage = () => {
	const { customerData, isAuth, setIsLoginOpen } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			customerData: state.customerData,
			setIsLoginOpen: state.setIsLoginOpen
		})
	);

	const {
		totalCartCount,
		subtotal,
		cartProducts,
		updateQuantityByProductId,
		removeProductByIdFromCart
	} = useCartStore();

	const router = useRouter();

	const cartReviewHandler = async () => {
		if (!isAuth) {
			setIsLoginOpen();
		} else {
			const orderItemsBySellerId = {};
			const orderItems = cartProducts.map((cartProduct) => {
				const { product } = cartProduct;
				const sellerId = product.seller_id;

				const orderItem = {
					product_id: product.id,
					item: product.product_name?.en,
					unit_Cost: product.product_price,
					quantity: cartProduct.quantity,
					discount: 0,
					total: cartProduct.total
				};

				const orderItemBySellerId = (orderItemsBySellerId as any)[
					sellerId
				];
				if (!orderItemBySellerId) {
					(orderItemsBySellerId as any)[sellerId] = {
						seller_id: sellerId,
						order_items: [orderItem]
					};
				} else {
					(orderItemsBySellerId as any)[sellerId] = {
						seller_id: sellerId,
						order_items: [...orderItemBySellerId.order_items, orderItem]
					};
				}

				return orderItem;
			});

			// console.log('orderItemsBySellerId =', orderItemsBySellerId);
			// console.log('orderItems =', orderItems);

			const orderId = await createOrder({
				buyer_id: customerData.id,
				order_by_sellers: Object.values(orderItemsBySellerId || {}),
				order_items: orderItems
			});

			if (!orderId) {
				return;
			}

			router.push(`/cart-review?order_id=${orderId}`);
		}
	}; // End of cartReviewHandler function

	return (
		<div className="grid grid-cols-12 gap-4 md:py-4 md:px-8">
			{/* Stat cards */}
			<div className="col-span-12">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{/* Stat cards */}
					<div className="space-y-4 bg-white px-4 py-2 pb-8 shadow-md md:rounded-md">
						<p className="text-[18px]  font-semibold text-primary-main md:text-[38px]">
							Hi, {customerData.name}
						</p>

						{/* For small device */}
						<div className="space-y-2 px-8 md:hidden">
							<div className="flex flex-col items-end">
								<p className="text-[14px] font-semibold text-gray">
									Total number of items
									<span>Qty: 4</span>
								</p>
								<p className="text-[14px] font-semibold text-gray">
									Total number of SKUs
									<span>Qty: 2</span>
								</p>
							</div>
							<div className="flex flex-col items-end space-y-2">
								<div className="text-[14px] font-semibold">
									<p className="text-gray">Subtotal (4 items)</p>
									<p className="text-right text-primary-main">
										$100,000.00
									</p>
								</div>
								<Button onClick={cartReviewHandler} variant="special">
									Proceed to checkout
								</Button>
							</div>
						</div>

						{/* For medium device */}
						<div className="hidden md:block">
							<p className="text-[26px] font-semibold text-gray">
								Total number of items in cart
							</p>
							<p className="text-center text-[38px] font-semibold">
								<span className="text-gray">Qty:</span>
								<span className="text-primary-main">
									{totalCartCount}
								</span>
							</p>
						</div>
					</div>

					<div className="hidden flex-col items-center space-y-4 rounded-md bg-white p-2 pb-8 shadow-md md:flex">
						<div className="text-[35px] font-semibold">
							<p className="text-gray">
								Subtotal ({totalCartCount} items):
							</p>
							<p className="text-center text-primary-main">
								${subtotal}
							</p>
						</div>
						<Button
							onClick={cartReviewHandler}
							variant="special"
							className="h-[71px] !text-[30px]"
						>
							Review and purchase
						</Button>
					</div>
				</div>
			</div>

			{/* carts product list */}
			<div className="col-span-12 bg-white px-4 py-2">
				<h3 className="mb-4 border-b-2 border-gray/40 text-[18px] font-semibold text-primary-main md:text-[38px]">
					Shopping Cart
				</h3>

				<div>
					<CartList
						carts={cartProducts}
						updateQuantityByProductId={updateQuantityByProductId}
						removeProductByIdFromCart={removeProductByIdFromCart}
					/>
				</div>
			</div>

			{/* Total */}
			<div className="col-span-12 hidden md:block">
				<div className="flex flex-col items-center space-y-4 rounded-md bg-white p-2 pb-8 shadow-md">
					<div className="text-[35px] font-semibold">
						<p className="text-gray">
							Subtotal ({totalCartCount} items):
						</p>
						<p className="text-center text-primary-main">${subtotal}</p>
					</div>
					<Button
						onClick={cartReviewHandler}
						variant="special"
						className="h-[71px] !text-[30px]"
					>
						Review and purchase
					</Button>
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale || 'en'))
	}
});

export default CartPage;
