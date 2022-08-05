import { Tab } from '@headlessui/react';
import { getAddresses } from 'lib/customer/addres.lib';
import { useEffect, useState } from 'react';
import { useAuthStore } from 'store/auth';
import Button from '../common/form/button';
import { Modal } from '../common/modal/modal';
import AddressList from './address-list';

const AddressModal: React.FC = () => {
	const [shippingAddresses, setShippingAddresses] = useState<any[]>([]);
	const [selectedShippingAddressId, setSelectedShippingAddressId] =
		useState('');
	const { id } = useAuthStore((state) => state.customerData);

	useEffect(() => {
		getAddresses(id).then((addresses) => {
			setShippingAddresses(addresses);
			console.log(addresses);
		});
	}, []);

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
				shippingAddress.is_default = false;
				if (upcomingState && shippingAddress.id === id) {
					shippingAddress.is_default = upcomingState;
				}
				return shippingAddress;
			}
		);

		setShippingAddresses(updatedShippingAddress);
	};

	return (
		<Modal open={true} onClose={() => {}} overlayClassName="!bg-white">
			<div className="w-full pr-4">
				<h1 className="mb-6 text-[40px] font-semibold">
					Select Shipping and Billing Address
				</h1>

				<Tab.Group>
					<Tab.List>
						<Tab className="mr-4 rounded-md bg-primary-main p-2 text-white shadow-md">
							Shipping Address
						</Tab>
						<Tab className="rounded-md border border-primary-main p-2 text-primary-main">
							Billing Address
						</Tab>
					</Tab.List>
					<Tab.Panels className="mt-6">
						<Tab.Panel>
							<AddressList
								addresses={shippingAddresses}
								onChange={onShippingAddressSelectUnSelectHandler}
							/>
						</Tab.Panel>
						<Tab.Panel>
							<AddressList
								addresses={shippingAddresses}
								onChange={onShippingAddressSelectUnSelectHandler}
							/>
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>

				<div className="mt-16 flex justify-center">
					<Button variant="buyer">Review</Button>
				</div>
			</div>
		</Modal>
	);
};

export default AddressModal;
