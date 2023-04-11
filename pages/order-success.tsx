import Button from 'components/common/form/button';
import {
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';

// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store-v2';

const CheckoutPage: NextPage = () => {
	const customerData = useAuthStore((state) => state.customerData);
	const { cartItems, resetCart } = useCartStore((state) => ({
		resetCart: state.resetCart,
		cartItems: state.cartItems
	}));

	const { query } = useRouter();
	const { t } = useTranslation();

	useEffect(() => {
		const {
			payment_intent,
			payment_intent_client_secret,
			redirect_status
		} = query as any;

		if (
			payment_intent &&
			payment_intent_client_secret &&
			redirect_status &&
			cartItems?.length > 0
		) {
			resetCart();
		}
	}, [query, cartItems?.length]);

	return (
		<div className="container mx-auto flex flex-col items-center p-4 md:p-8">
			<h1 className="text-center font-semibold text-primary-main md:text-[40px]">
				{t('cart:your_order_has_been_placed_successfully')}{' '}
			</h1>

			<div className="my-8 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
				<Button href="/" variant="buyer">
					{t('cart:continue_shopping')}
				</Button>
				<Button
					href={generateBuyerDashboardUrl({
						redirect_to: BUYER_DASHBOARD_PAGES.buyers,
						access_key: customerData.access.token,
						refresh_key: customerData.refresh.token
					})}
					className="border-2 border-accent-primary-main !text-accent-primary-main hover:bg-accent-primary-main hover:!text-white"
				>
					{t('cart:see_all_orders')}
				</Button>
			</div>
		</div>
	);
}; // End of CheckoutPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale || 'en'))
	}
});

export default CheckoutPage;
