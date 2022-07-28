// Third party packages
import {
	CardElement,
	useElements,
	useStripe
} from '@stripe/react-stripe-js';

import Button from '../common/form/button';

const PaymentForm: React.FC = () => {
	const stripe = useStripe();
	const elements = useElements();

	const paymentHandler = async (e: any) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}
	}; // End of paymentHandler function

	return (
		<div>
			<CardElement />
			<Button>PAY</Button>
		</div>
	);
}; // End of PaymentForm

export default PaymentForm;
