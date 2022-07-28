import { GetStaticProps, NextPage } from 'next';

// Third party packages
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import PaymentForm from 'components/website/checkout/payment-form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
	(process.env.STRIPE_PUBLISHABLE_KEY || '') as string
);

const CheckoutPage: NextPage = () => {
	const [clientSecret, setClientSecret] = useState('');

	const { query } = useRouter();

	useEffect(() => {
		const clientSecret = (query.client_secret || '') as string;
		setClientSecret(clientSecret);
	}, [query]);

	const options = {
		// passing the client secret obtained from the server
		clientSecret: clientSecret
	};

	return (
		<div className="flex justify-center">
			<div className="m-4 w-[480px] rounded bg-white px-8 py-4">
				<h1 className="mb-6 text-[32px] font-semibold text-gray">
					Checkout
				</h1>
				{clientSecret && (
					<Elements stripe={stripePromise} options={options}>
						<PaymentForm />
					</Elements>
				)}
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
