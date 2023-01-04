// Third party packages
import {
	PaymentElement,
	useElements,
	useStripe
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import SpinnerIcon from '../common/elements/loader/spinner-icon';

import Button from '../common/form/button';

const PaymentForm: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);

	const stripe = useStripe();
	const elements = useElements();

	const paymentHandler = async (e: any) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);
		try {
			const data = await stripe.confirmPayment({
				elements,
				confirmParams: {
					return_url: `${process.env.SITE_URL}/order-success`
				}
			});
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	}; // End of paymentHandler function

	return (
		<div>
			<PaymentElement />
			<Button
				onClick={!isLoading ? paymentHandler : undefined}
				variant="product"
				className="my-6 w-full"
			>
				{isLoading ? <SpinnerIcon className="!h-6 !w-6" /> : 'PAY'}
			</Button>
		</div>
	);
}; // End of PaymentForm

export default PaymentForm;
