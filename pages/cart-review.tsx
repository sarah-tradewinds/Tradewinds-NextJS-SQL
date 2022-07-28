import { GetStaticProps, NextPage } from 'next';

import Button from 'components/website/common/form/button';

// Third party packages
import { loadStripe } from '@stripe/stripe-js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// store
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store';
import { getLocaleText } from 'utils/get_locale_text';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
	'pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3'
);

const CartReviewPage: NextPage = () => {
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
		removeProductByIdFromCart
	} = useCartStore();

	const router = useRouter();

	useEffect(() => {
		if (!isAuth) {
			router.back();
		}
	}, [isAuth]);

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
								<Button
									onClick={() => router.push('/checkout')}
									variant="product"
								>
									{' '}
									Buy now
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
							onClick={() => router.push('/checkout')}
							variant="product"
							className="h-[71px] !text-[30px]"
						>
							Buy now
						</Button>
					</div>
				</div>
			</div>

			{/* review section */}
			<div className="col-span-12 bg-white px-6 py-4">
				<h2 className="text-[18px] font-semibold text-primary-main md:text-right md:text-[25px]">
					Order: TW62539
				</h2>

				{/* Addresses */}
				<div className="grid grid-cols-1 md:grid-cols-2">
					{/* Bill to */}
					<div className="space-y-4">
						{/* Billed to */}
						<div className="md:w-[400px]">
							<p className="text-[18px] font-semibold text-accent-primary-main md:text-[25px]">
								Billed to:
							</p>
							<p className="text-[15px] text-gray md:ml-16 md:text-[18px]">
								Big Tractor Co. 142 Tractor Road Toledo, Ohio 43614 USA{' '}
							</p>
						</div>
						{/* Email */}
						<p>
							<span className="block text-[18px] font-semibold text-accent-primary-main md:inline-block md:w-[116px] md:text-[25px]">
								Email:
							</span>
							<span className="text-[18px] text-gray">
								Tractorbob@tractorlove.com
							</span>
						</p>
						{/* Phone */}
						<p>
							<span className="block text-[18px] font-semibold text-accent-primary-main md:inline-block md:w-[116px] md:text-[25px]">
								Phone:
							</span>
							<span className="text-[18px] text-gray">
								435-547-6674
							</span>
						</p>
					</div>

					{/* Ship to*/}
					<div className="space-y-4">
						{/* Ship to */}
						<div className="md:w-[400px]">
							<p className="text-[18px] font-semibold text-accent-primary-main md:text-[25px]">
								Ship to:
							</p>
							<p className="text-[15px] text-gray md:ml-16 md:text-[18px]">
								Big Tractor Co. 142 Tractor Road Toledo, Ohio 43614 USA{' '}
							</p>
						</div>
						{/* Email */}
						<p>
							<span className="block text-[18px] font-semibold text-accent-primary-main md:inline-block md:w-[116px] md:text-[25px]">
								Email:
							</span>
							<span className="text-[18px] text-gray">
								Tractorbob@tractorlove.com
							</span>
						</p>
						{/* Phone */}
						<p>
							<span className="block text-[18px] font-semibold text-accent-primary-main md:inline-block md:w-[116px] md:text-[25px]">
								Phone:
							</span>
							<span className="text-[18px] text-gray">
								435-547-6674
							</span>
						</p>
					</div>
				</div>

				{/* order summary */}
				<div className="mt-8">
					<p className="border-b border-gray text-[18px] font-semibold text-primary-main md:text-[25px]">
						Order Summary
					</p>
					<table className="w-ful">
						<tr className="text-[18px] text-accent-primary-main md:text-[25px]">
							<th className="w-1/4 md:w-1/4">Item</th>
							<th className="w-1/4 md:w-1/4">QTY</th>
							<th className="w-1/2 md:w-1/2">Unit Price</th>
							<th className="w-1/4 md:w-1/2">Subtotal</th>
						</tr>
						<tbody>
							{cartProducts.map((cartProduct: any) => {
								const { product } = cartProduct || {};
								return (
									<tr
										key={cartProduct.id}
										className="text-[18px] text-gray"
									>
										<td className="md:text-center">
											{getLocaleText(
												product.product_name || {},
												router.locale
											)}
										</td>
										<td className="md:text-center">
											{cartProduct.quantity}
										</td>
										<td className="md:text-center">
											${product.product_price}
										</td>
										<td className="md:text-center">
											${cartProduct.total}
										</td>
									</tr>
								);
							})}

							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td className="pt-8 text-center">${subtotal}</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* shipping and handling */}
				<div>
					<p className="border-b border-gray text-[18px] font-semibold text-primary-main md:text-[25px]">
						Shipping & Handiling
					</p>
					<div className="mt-4 flex justify-end space-x-16">
						<div className="text-[18px] text-gray">
							<p>Item Subtotal</p>
							<p>Shipping & Handling</p>
							<p>Taxes</p>
						</div>
						<div className="text-[18px] text-gray">
							<p>${subtotal}</p>
							<p>$100,000</p>
						</div>
					</div>
					{/* Total container */}
					<div className="mt-4 flex justify-between bg-gray/20 px-4 py-2 text-[18px] font-semibold md:justify-end md:space-x-16 md:text-[25px]">
						<p>Total</p>
						<div>
							<p>${subtotal}</p>
							<p className="mt-0 text-right text-[8px] font-semibold text-primary-main">
								Transation fee apply
							</p>
						</div>
					</div>
				</div>

				{/* actions */}
				<div className="mt-4 flex flex-col items-center">
					<Button
						onClick={() => router.push('/checkout')}
						variant="product"
					>
						Buy now
					</Button>
					<Button onClick={() => router.back()} className="mt-4">
						<span className="text-[18px] font-semibold text-accent-primary-main">
							Back to cart
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