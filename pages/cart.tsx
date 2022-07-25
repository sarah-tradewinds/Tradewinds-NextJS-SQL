import { GetStaticProps, NextPage } from 'next';

import CartList from 'components/website/cart/cart-list';
import Button from 'components/website/common/form/button';

// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// store
import { useCartStore } from 'store/cart-store';

const CartPage: NextPage = () => {
	const { totalCartCount, carts } = useCartStore();

	return (
		<div className="grid grid-cols-12 gap-4 py-4 px-8">
			{/* Stat cards */}
			<div className="col-span-12">
				<div className="grid grid-cols-2 gap-4">
					{/* Stat cards */}
					<div className="space-y-4 rounded-md bg-white px-4 py-2 pb-8 shadow-md">
						<p className="text-[38px] font-semibold text-primary-main">
							Hi, Vishal
						</p>
						<p className="text-[26px] font-semibold text-gray">
							Total number of items in cart
						</p>
						<p className="text-center text-[38px] font-semibold">
							<span className="text-gray">Qty:</span>
							<span className="text-primary-main">4</span>
						</p>
					</div>

					<div className="flex flex-col items-center space-y-4 rounded-md bg-white p-2 pb-8 shadow-md">
						<div className="text-[35px] font-semibold">
							<p className="text-gray">Subtotal (4 items):</p>
							<p className="text-center text-primary-main">
								$100,000.00
							</p>
						</div>
						<Button variant="special" className="h-[71px] !text-[30px]">
							Review and purchase
						</Button>
					</div>
				</div>
			</div>

			{/* carts product list */}
			<div className="col-span-12 bg-white px-4 py-2">
				<h3 className="mb-4 border-b-2 border-gray/40 text-[38px] font-semibold text-primary-main">
					Shopping Cart
				</h3>

				<div>
					<CartList
						carts={[
							{ id: '1', quantity: 1 },
							{ id: '1', quantity: 1 }
						]}
					/>
				</div>
			</div>

			{/* Total */}
			<div className="col-span-12">
				<div className="flex flex-col items-center space-y-4 rounded-md bg-white p-2 pb-8 shadow-md">
					<div className="text-[35px] font-semibold">
						<p className="text-gray">Subtotal (4 items):</p>
						<p className="text-center text-primary-main">$100,000.00</p>
					</div>
					<Button variant="special" className="h-[71px] !text-[30px]">
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
