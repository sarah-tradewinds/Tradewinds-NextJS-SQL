import { GetStaticProps, NextPage } from 'next';

import CartList from 'components/cart/cart-list';
import Button from 'components/common/form/button';

// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// store
import AddressModal from 'components/address/address-modal';
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import ErrorPopup from 'components/common/popup/error-popup';
import { createOrder } from 'lib/order';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store-v2';

const CartPage: NextPage = () => {
	const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
	const [isMinimumQuantityModalOpen, setIsMinimumQuantityModalOpen] =
		useState(false);
	const [minimumQuantityErrorMessage, setMinimumQuantityErrorMessage] =
		useState('');

	const { t } = useTranslation();

	const { customerData, isAuth, setIsLoginOpen } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			customerData: state.customerData,
			setIsLoginOpen: state.setIsLoginOpen
		})
	);

	const {
		totalAmount,
		totalItem: totalCartItem,
		cartItems,
		updateProductVariantInCart,
		removeProductVariantByProductVariantIdFromCart
	} = useCartStore();
	console.log('[cart] cartItems =', cartItems);
	console.log('[cart] subtotal =', totalAmount);

	const router = useRouter();

	let isAddressSelected = false;
	if (typeof window !== 'undefined') {
		isAddressSelected =
			!localStorage.getItem('shipping_address_id') ||
			!localStorage.getItem('billing_address_id');
	}

	useEffect(() => {
		let isAddressSelected = false;
		if (typeof window !== 'undefined') {
			isAddressSelected =
				!localStorage.getItem('shipping_address_id') ||
				!localStorage.getItem('billing_address_id');
		}
	}, [isAuth]);

	const cartReviewHandler = async () => {
		if (!isAuth) {
			setIsLoginOpen();
			return;
		}

		if (minimumQuantityErrorMessage) {
			setIsMinimumQuantityModalOpen(true);
			return;
		}

		if (
			!localStorage.getItem('shipping_address_id') ||
			!localStorage.getItem('billing_address_id')
		) {
			setIsAddressModalOpen(true);
			return;
		}

		const orderItems = cartItems.map((cartProduct) => {
			const { product } = cartProduct;

			const orderItem = {
				product_variant_id: cartProduct.productVariantId,
				quantity: cartProduct.quantity,
				discount: 0
			};
			return orderItem;
		});

		const orderId = await createOrder({
			order_items: orderItems,
			shipping_address: localStorage.getItem('shipping_address_id'),
			billing_address: localStorage.getItem('billing_address_id')
		});

		if (!orderId) {
			return;
		}

		setMinimumQuantityErrorMessage('');
		router.push(`/cart-review?order_id=${orderId}`);
	}; // End of cartReviewHandler function

	const totalCartItemCount = cartItems?.length || 0;

	if (totalCartItemCount === 0) {
		return (
			<div className="flex h-screen flex-col items-center justify-center">
				<div>
					<ImageWithErrorHandler
						src="/images/empty-cart.png"
						alt="Empty Cart"
						width={350}
						height={350}
					/>
				</div>
				<Button variant="buyer" href="/">
					Continue Shopping
				</Button>
			</div>
		);
	}

	return (
		<>
			{/* Addresses */}
			<AddressModal
				open={isAddressModalOpen}
				onClose={() => {
					setIsAddressModalOpen(false);
					// cartReviewHandler();
				}}
			/>
			<ErrorPopup
				title="Minimum Order Quantity"
				description={minimumQuantityErrorMessage}
				isOpen={isMinimumQuantityModalOpen}
				onClose={() => {
					setIsMinimumQuantityModalOpen(false);
					setMinimumQuantityErrorMessage('');
				}}
			/>

			<div className="container mx-auto grid grid-cols-12 gap-4 md:py-4 md:px-8">
				{/* Stat cards */}
				<div className="col-span-12">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						{/* Stat cards */}
						<div className="space-y-4 bg-white px-4 py-2 pb-8 shadow-md md:rounded-md">
							<p className="text-[18px]  font-semibold text-primary-main md:text-[38px]">
								{t('common:hi')},{' '}
								{customerData.name || t('common:guest')}
							</p>

							{/* For small device */}
							<div className="space-y-2 px-8 md:hidden">
								<div className="flex flex-col items-end">
									<p className="text-[14px] font-semibold text-gray">
										{t('cart:total_number_of_items_in_cart')}
										<span>: {totalCartItem}</span>
									</p>
									<p className="text-[14px] font-semibold text-gray">
										{t('cart:total_number_of_skus')}
										<span>: {totalCartItem}</span>
									</p>
								</div>
								<div className="flex flex-col items-end space-y-2">
									<div className="text-[14px] font-semibold">
										<p className="text-gray">
											{t('cart:subtotal')} ({totalCartItem}{' '}
											{t('cart:items')})
										</p>
										<p className="text-right text-primary-main">
											${totalAmount}
										</p>
									</div>
									<Button onClick={cartReviewHandler} variant="special">
										{t('cart:proceed_to_checkout')}
									</Button>
								</div>
							</div>

							{/* For medium device */}
							<div className="hidden md:block">
								<p className="text-[26px] font-semibold text-gray">
									{t('cart:total_number_of_items_in_cart')}
								</p>
								<p className="text-center text-[38px] font-semibold">
									<span className="text-primary-main">
										{totalCartItemCount}
									</span>
								</p>
							</div>
						</div>

						<div className="hidden flex-col items-center space-y-4 rounded-md bg-white p-2 pb-8 shadow-md md:flex">
							<div className="text-[35px] font-semibold">
								<p className="text-gray">
									{t('cart:subtotal')} ({totalCartItem}{' '}
									{t('cart:items')}):
								</p>
								<p className="text-center text-primary-main">
									${totalAmount}
								</p>
							</div>
							<Button
								onClick={cartReviewHandler}
								variant="special"
								className="h-[71px] !text-[30px]"
							>
								{t('cart:review_and_purchase')}
							</Button>
						</div>
					</div>
				</div>

				{/* carts product list */}
				<div className="col-span-12 bg-white px-4 py-2">
					<h3 className="mb-4 border-b-2 border-gray/40 text-[18px] font-semibold text-primary-main md:text-[38px]">
						{t('cart:shopping_cart')}
					</h3>

					<div>
						<CartList
							carts={cartItems}
							updateQuantityByProductVariantId={(
								productVariantId,
								inputQuantity,
								payload
							) => {
								console.log('productVariantId =', productVariantId);
								console.log('inputQuantity =', inputQuantity);
								console.log('payload =', payload);

								const { product } = payload || {};
								const minimumOrderQuantity =
									product?.inventory?.minimum_order_quantity;

								if (inputQuantity < minimumOrderQuantity) {
									setIsMinimumQuantityModalOpen(true);
									setMinimumQuantityErrorMessage(
										`This product has a minimum order quantity requirement of <${minimumOrderQuantity}>. In order to proceed further buying this product, you need to buy a minimum quantity of <${minimumOrderQuantity}> or more.`
									);
									return;
								}

								setMinimumQuantityErrorMessage('');

								updateProductVariantInCart(
									productVariantId,
									inputQuantity
								);
							}}
							removeProductByProductVariantIdFromCart={
								removeProductVariantByProductVariantIdFromCart
							}
						/>
					</div>
				</div>

				{/* Total */}
				<div className="col-span-12 hidden md:block">
					<div className="flex flex-col items-center space-y-4 rounded-md bg-white p-2 pb-8 shadow-md">
						<div className="text-[35px] font-semibold">
							<p className="text-gray">
								{t('cart:subtotal')} ({totalCartItemCount}{' '}
								{t('cart:items')}):
							</p>
							<p className="text-center text-primary-main">
								${totalAmount}
							</p>
						</div>
						<Button
							onClick={cartReviewHandler}
							variant="special"
							className="h-[71px] !text-[30px]"
						>
							{t('cart:review_and_purchase')}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale || 'en'))
	}
});

export default CartPage;
