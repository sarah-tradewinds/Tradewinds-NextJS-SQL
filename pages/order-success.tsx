import Button from 'components/website/common/form/button';
import {
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';
import { GetStaticProps, NextPage } from 'next';

// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store';

const CheckoutPage: NextPage = () => {
	const customerData = useAuthStore((state) => state.customerData);
	const { resetCartState, totalCartCount } = useCartStore((state) => ({
		resetCartState: state.resetCartState,
		totalCartCount: state.totalCartCount
	}));

	const { query } = useRouter();

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
			totalCartCount > 0
		) {
			resetCartState();
		}
	}, [query, totalCartCount]);

	return (
		<div className="flex flex-col items-center p-4 md:p-8">
			<h1 className="text-center font-semibold text-primary-main md:text-[40px]">
				Your order has been placed successfully{' '}
			</h1>

			<div className="my-8 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
				<Button href="/" variant="buyer">
					Continue Shopping
				</Button>
				<Button
					href={generateBuyerDashboardUrl({
						redirect_to: BUYER_DASHBOARD_PAGES.buyers,
						access_key: customerData.access.token,
						refresh_key: customerData.refresh.token
					})}
					className="border-2 border-accent-primary-main !text-accent-primary-main hover:bg-accent-primary-main hover:!text-white"
				>
					See all orders
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
