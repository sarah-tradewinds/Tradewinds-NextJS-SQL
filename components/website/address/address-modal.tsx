import { Tab } from '@headlessui/react';
import { getAddresses } from 'lib/customer/addres.lib';
import { useEffect, useState } from 'react';
import { useAuthStore } from 'store/auth';
import Button from '../common/form/button';
import { Modal, ModalProps } from '../common/modal/modal';
import AddressList from './address-list';

const AddressModal: React.FC<ModalProps> = (props) => {
	const { open, onClose } = props;

	const [shippingAddresses, setShippingAddresses] = useState<any[]>([]);
	const [billingAddresses, setBillingAddresses] = useState<any[]>([]);
	const [selectedShippingAddressId, setSelectedShippingAddressId] =
		useState('');
	const [selectedBillingAddressId, setSelectedBillingAddressId] =
		useState('');

	const [errorMessage, setErrorMessage] = useState('');

	const { isAuth, buyerId, isLoginOpen, isSignUpOpen } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			buyerId: state.customerData.buyerId,
			isLoginOpen: state.isLoginOpen,
			isSignUpOpen: state.isSignUpOpen
		})
	);

	useEffect(() => {
		getAddresses(buyerId, 'shipping').then((addresses) =>
			setShippingAddresses(addresses)
		);

		getAddresses(buyerId, 'billing').then((addresses) =>
			setBillingAddresses(addresses)
		);
	}, [isAuth]);

	useEffect(() => {
		localStorage.setItem(
			'shipping_address_id',
			selectedShippingAddressId
		);

		localStorage.setItem(
			'billing_address_id',
			selectedBillingAddressId
		);
	}, [selectedShippingAddressId, selectedBillingAddressId]);

	const onShippingAddressSelectUnSelectHandler = (
		currentState: boolean,
		id: string
	) => {
		const upcomingState = !currentState;
		if (upcomingState) {
			setSelectedShippingAddressId(id);
		}

		const updatedShippingAddress = shippingAddresses.map(
			(shippingAddress: any) => {
				shippingAddress.isSelected = false;
				if (upcomingState && shippingAddress.id === id) {
					shippingAddress.isSelected = upcomingState;
				}
				return shippingAddress;
			}
		);

		setShippingAddresses(updatedShippingAddress);
	}; // End of onShippingAddressSelectUnSelectHandler

	const onBillingAddressSelectUnSelectHandler = (
		currentState: boolean,
		id: string
	) => {
		const upcomingState = !currentState;
		if (upcomingState) {
			setSelectedBillingAddressId(id);
		}

		const updatedBillingAddress = billingAddresses.map(
			(shippingAddress: any) => {
				shippingAddress.isSelected = false;
				if (upcomingState && shippingAddress.id === id) {
					shippingAddress.isSelected = upcomingState;
				}
				return shippingAddress;
			}
		);

		setBillingAddresses(updatedBillingAddress);
	}; // End of onBillingAddressSelectUnSelectHandler

	const gotoCartReview = () => {
		if (!selectedShippingAddressId) {
			setErrorMessage('Please Select Shipping Address');
			return;
		}

		if (!selectedBillingAddressId) {
			setErrorMessage('Please Select Billing Address');
			return;
		}

		setErrorMessage('');
		onClose();
	};

	return (
		<Modal
			open={open}
			onClose={() => {}}
			overlayClassName="!bg-white top-[80px]"
			className={`${isLoginOpen || isSignUpOpen ? '!z-[5]' : ''}`}
		>
			<div className="w-fulls m-8 pr-4">
				<div className="mb-6 flex items-center justify-between">
					<h1 className="text-[40px] font-semibold">
						Select Shipping and Billing Address
					</h1>
					<Button className="border border-accent-primary-main !text-accent-primary-main">
						+ ADD NEW ADDRESS
					</Button>
				</div>

				{errorMessage && (
					<h2 className="mb-4 text-[24px] font-semibold text-error">
						{errorMessage}
					</h2>
				)}

				<Tab.Group>
					<Tab.List>
						<Tab
							className={({ selected }) =>
								`mr-4 rounded-md  p-2 shadow-md ${
									!selectedShippingAddressId && errorMessage
										? 'animate-bounce'
										: ''
								} ${
									selected
										? 'bg-primary-main text-white'
										: 'border border-primary-main text-primary-main'
								}`
							}
						>
							SHIPPING ADDRESS
						</Tab>
						<Tab
							className={({ selected }) =>
								`mr-4 rounded-md p-2 shadow-md ${
									!selectedBillingAddressId &&
									selectedShippingAddressId &&
									errorMessage
										? 'animate-bounce'
										: ''
								}  ${
									selected
										? 'bg-primary-main text-white'
										: 'border border-primary-main text-primary-main'
								}`
							}
						>
							BILLING ADDRESS
						</Tab>
					</Tab.List>

					<Tab.Panels className="mt-6">
						<Tab.Panel>
							<AddressList
								addresses={shippingAddresses}
								onChange={onShippingAddressSelectUnSelectHandler}
							/>
						</Tab.Panel>

						{/* Billing Address */}
						<Tab.Panel>
							<AddressList
								addresses={billingAddresses}
								onChange={onBillingAddressSelectUnSelectHandler}
							/>
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>

				<div className="mt-16 flex justify-center">
					<Button onClick={gotoCartReview} variant="buyer">
						Processed to Cart Review
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default AddressModal;
