import { Tab } from '@headlessui/react';
import { getAddresses } from 'lib/customer/addres.lib';
import { useEffect, useState } from 'react';
import { useAuthStore } from 'store/auth';
import Button from '../common/form/button';
import { Modal, ModalProps } from '../common/modal/modal';
import AddAddressModal from './add-address-modal';
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
	const [isAddAddressModalOpen, setIsAddAddressModalOpen] =
		useState(false);

	const { isAuth, buyerId, isLoginOpen, isSignUpOpen } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			buyerId: state.customerData.buyerId,
			isLoginOpen: state.isLoginOpen,
			isSignUpOpen: state.isSignUpOpen
		})
	);
	useEffect(() => {
		const [bodyTag] =
			Array.from(document.getElementsByTagName('body')) || [];
		if (open && bodyTag) {
			bodyTag.style.overflow = 'hidden';
		}
	}, [open]);

	const getBuyerShippingAndBillingAddresses = () => {
		getAddresses(buyerId).then((addresses) =>
			setShippingAddresses(addresses)
		);

		getAddresses(buyerId, 'billing').then((addresses) =>
			setBillingAddresses(addresses)
		);
	}; // End of   const getBuyerShippingAndBillingAddresses = () => {

	useEffect(() => {
		getBuyerShippingAndBillingAddresses();
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

	const closeModal = () => {
		const [bodyTag] =
			Array.from(document.getElementsByTagName('body')) || [];
		if (bodyTag) {
			bodyTag.style.overflow = 'auto';
		}

		onClose();
	}; // End of closeModal

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
		closeModal();
	};

	return (
		<>
			<AddAddressModal
				isOpen={isAddAddressModalOpen}
				onCancel={() => setIsAddAddressModalOpen(false)}
				onAddressAdded={() => {
					setIsAddAddressModalOpen(false);
					getBuyerShippingAndBillingAddresses();
				}}
			/>

			<Modal
				open={open}
				onClose={() => {}}
				overlayClassName="!bg-white top-[80px]"
				className={`${
					isLoginOpen || isSignUpOpen ? '!z-[5]' : ''
				} !top-[128px] w-full`}
			>
				<div className="mx-4 pr-4 lg:mx-8 lg:mt-8">
					<div className="mb-6 items-center justify-between md:flex">
						<h1 className="text-lg font-semibold md:text-[24px] lg:text-[32px] xl:text-[40px]">
							Select Shipping and Billing Address
						</h1>
						<Button
							onClick={() => setIsAddAddressModalOpen(true)}
							className="mt-4 !h-10 !w-full border border-accent-primary-main !py-0 !px-2 !text-accent-primary-main md:mt-0 md:!h-[40px] md:!w-[240px] md:rounded-none"
						>
							+<span className="px-2">ADD NEW ADDRESS</span>
						</Button>
					</div>

					{errorMessage && (
						<h2 className="mb-4 text-[24px] font-semibold text-error">
							{errorMessage}
						</h2>
					)}

					<Tab.Group>
						<Tab.List className="flex items-center">
							<Tab
								className={({ selected }) =>
									`mr-4 rounded-md p-2 shadow-md ${
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

						<Tab.Panels className="mt-6 h-[380px] overflow-y-auto p-4 pb-24 md:h-[80vh] lg:h-[72vh]">
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

					<div className="fixed bottom-0 left-0 flex w-full rounded-none bg-secondary md:mt-16 md:justify-center">
						<Button
							onClick={gotoCartReview}
							variant="buyer"
							className="!w-full !rounded-none"
						>
							Proceed to Cart Review
						</Button>

						<Button
							variant="special"
							onClick={closeModal}
							className="!rounded-none"
						>
							Close
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default AddressModal;
