import { GetStaticProps, NextPage } from 'next';

import Button from 'components/common/form/button';

// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// store
import { getOrderById, getPaymentIntentByOrderId } from 'lib/order';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store';
import { getLocaleText } from 'utils/get_locale_text';

const CartReviewPage: NextPage = () => {
	const { customerData, isAuth, setIsLoginOpen } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			customerData: state.customerData,
			setIsLoginOpen: state.setIsLoginOpen
		})
	);

	const { t } = useTranslation();
	const cartProducts = useCartStore((state) => state.cartProducts);

	const [orderReview, setOrderReview] = useState({});

	const router = useRouter();

	useEffect(() => {
		if (!isAuth) {
			router.back();
		}
	}, [isAuth]);

	useEffect(() => {
		const orderId = (router.query.order_id || '') as string;
		getOrderById(orderId).then((orderData) =>
			setOrderReview(orderData)
		);
	}, [router.query.order_id]);

	const gotoCheckout = async () => {
		const orderId = (router.query.order_id || '') as string;

		const client_secret = await getPaymentIntentByOrderId(orderId);
		router.push(`/checkout?client_secret=${client_secret}`);
	}; //End of gotoCheckout function

	const {
		order_number = '',
		billing_address = {},
		shipping_address = {},
		order_items = [],

		// charges
		shipping_charge = 0,
		stripe_charge = 0,
		tax = 0,

		// totals
		sub_total = 0,
		grand_total = 0,
		amount_to_pay = 0
	} = orderReview as any;

	const totalCartItemCount = cartProducts?.length || 0;

	return (
		<div className="container mx-auto grid grid-cols-12 gap-4 md:py-4 md:px-8">
			{/* Stat cards */}
			<div className="col-span-12">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{/* Stat cards */}
					<div className="space-y-4 bg-white px-4 py-2 pb-8 shadow-md md:rounded-md">
						<p className="text-[18px]  font-semibold text-primary-main md:text-[38px]">
							{t('common:hi')}, {customerData.name}
						</p>

						{/* For small device */}
						<div className="space-y-2 px-8 md:hidden">
							<div className="flex flex-col items-end">
								<p className="text-[14px] font-semibold text-gray">
									{t('cart:total_number_of_items_in_cart')}
									<span>: {totalCartItemCount}</span>
								</p>
								<p className="text-[14px] font-semibold text-gray">
									{t('cart:total_number_of_skus')}
									<span>: {totalCartItemCount}</span>
								</p>
							</div>
							<div className="flex flex-col items-end space-y-2">
								<div className="text-[14px] font-semibold">
									<p className="text-gray">
										{t('cart:subtotal')} ({totalCartItemCount}{' '}
										{t('cart:items')})
									</p>
									<p className="text-right text-primary-main">
										${sub_total}
									</p>
								</div>
								<Button onClick={gotoCheckout} variant="product">
									{' '}
									{t('cart:buy_now')}
								</Button>
							</div>
						</div>

						{/* For medium and large device */}
						<div className="hidden md:block">
							<p className="text-[26px] font-semibold text-gray">
								{t('cart:total_number_of_items_in_cart')}:{' '}
								{totalCartItemCount}
							</p>
						</div>
					</div>

					<div className="hidden flex-col items-center space-y-4 rounded-md bg-white p-2 pb-8 shadow-md md:flex">
						<div className="text-[35px] font-semibold">
							<p className="text-gray">
								{t('cart:subtotal')} ({totalCartItemCount}{' '}
								{t('cart:items')}):
							</p>
							<p className="text-center text-primary-main">
								${sub_total}
							</p>
						</div>
						<Button
							onClick={gotoCheckout}
							variant="product"
							className="h-[71px] !text-[30px]"
						>
							{t('cart:buy_now')}
						</Button>
					</div>
				</div>
			</div>

			{/* review section */}
			<div className="col-span-12 bg-white px-6 py-4">
				<h2 className="text-[18px] font-semibold text-primary-main md:text-right md:text-[25px]">
					Order: {order_number}
				</h2>

				{/* Addresses */}
				<div className="grid grid-cols-1 md:grid-cols-2">
					{/* Bill to */}
					<div className="space-y-4">
						{/* Billed to */}
						<div className="md:w-[400px]">
							<p className="text-[18px] font-semibold text-accent-primary-main md:text-[25px]">
								{t('cart:bill_to')}:
							</p>
							<p className="text-[15px] text-gray md:ml-16 md:text-[18px]">
								{getLocaleText(
									billing_address?.address_line_1 || {},
									router.locale
								)}
							</p>
						</div>
						{/* Email */}
						<p>
							<span className="block text-[18px] font-semibold text-accent-primary-main md:inline-block md:w-[116px] md:text-[25px]">
								{t('auth:email')}:
							</span>
							<span className="text-[18px] text-gray">
								{billing_address?.email || customerData.email}
							</span>
						</p>
						{/* Phone */}
						<p>
							<span className="block text-[18px] font-semibold text-accent-primary-main md:inline-block md:w-[116px] md:text-[25px]">
								{t('auth:phone')}:
							</span>
							<span className="text-[18px] text-gray">
								{billing_address?.phone}
							</span>
						</p>
					</div>

					{/* Ship to*/}
					<div className="space-y-4">
						{/* Ship to */}
						<div className="md:w-[400px]">
							<p className="text-[18px] font-semibold text-accent-primary-main md:text-[25px]">
								{t('cart:ship_to')}:
							</p>
							<p className="text-[15px] text-gray md:ml-16 md:text-[18px]">
								{getLocaleText(
									shipping_address?.address_line_1 || {},
									router.locale
								)}
							</p>
						</div>
						{/* Email */}
						<p>
							<span className="block text-[18px] font-semibold text-accent-primary-main md:inline-block md:w-[116px] md:text-[25px]">
								{t('auth:email')}:
							</span>
							<span className="text-[18px] text-gray">
								{shipping_address?.email || customerData.email}
							</span>
						</p>
						{/* Phone */}
						<p>
							<span className="block text-[18px] font-semibold text-accent-primary-main md:inline-block md:w-[116px] md:text-[25px]">
								{t('auth:phone')}:
							</span>
							<span className="text-[18px] text-gray">
								{shipping_address?.phone}
							</span>
						</p>
					</div>
				</div>

				{/* order summary */}
				<div className="mt-8">
					<p className="border-b border-gray text-[18px] font-semibold text-primary-main md:text-[25px]">
						{t('common:order_summary')}:
					</p>
					<table className="w-ful">
						<tr className="text-[18px] text-accent-primary-main md:text-[25px]">
							<th className="w-1/4 md:w-1/4">Item</th>
							<th className="w-1/4 md:w-1/4">{t('cart:qty')}</th>
							<th className="w-1/4 md:w-1/4">{t('cart:unit_price')}</th>
							<th className="w-1/4 md:w-1/2">{t('cart:total')}</th>
						</tr>
						<tbody>
							{order_items?.map((orderItem: any) => {
								return (
									<tr
										key={orderItem?.id}
										className="text-[18px] text-gray"
									>
										<td className="text-center">
											{getLocaleText(
												orderItem?.name || {},
												router.locale
											)}
										</td>
										<td className="text-center">
											{orderItem?.quantity}
										</td>
										<td className="text-center">
											${orderItem?.unit_cost}
										</td>
										<td className="text-center">
											${orderItem?.sub_total}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>

				{/* shipping and handling */}
				<div className="mt-4">
					<p className="border-b border-gray text-[18px] font-semibold text-primary-main md:text-[25px]">
						{t('common:shipping_and_handling')}:
					</p>
					<div className="mt-4 flex justify-end space-x-16">
						<div className="text-[18px] text-gray">
							<p>{t('cart:item_subtotal')}</p>
							<p>{t('common:shipping_and_handling')}:</p>
							<p>{t('common:transaction_fees')}</p>
							<p>{t('common:taxes')}</p>
						</div>
						<div className="text-[18px] text-gray">
							<p>${sub_total}</p>
							<p>${shipping_charge}</p>
							<p>${stripe_charge}</p>
							<p>${tax}</p>
						</div>
					</div>
					{/* Total container */}
					<p className="text-[8px] font-semibold text-primary-main">
						{t(
							'cart:please_note_buyer_will_be_responsible_for_any_applicable_vat_import_customs_nationalization_fees_if_applicable'
						)}
					</p>
					<div className="mt-1 flex justify-between bg-gray/20 px-4 py-2 text-[18px] font-semibold md:justify-end md:space-x-16 md:text-[25px]">
						<p>{t('common:grand_total')}</p>
						<div>
							<p>${grand_total}</p>
						</div>
					</div>
				</div>

				{/* actions */}
				<div className="mt-4 flex flex-col items-center">
					<Button onClick={gotoCheckout} variant="product">
						{t('cart:buy_now')}
					</Button>
					<Button onClick={() => router.back()} className="mt-4">
						<span className="text-[18px] font-semibold text-accent-primary-main">
							{t('cart:back_to_cart')}
						</span>
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

export default CartReviewPage;
