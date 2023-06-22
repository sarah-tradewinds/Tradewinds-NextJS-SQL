import { Combobox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Button from 'components/common/form/button';
import Input from 'components/common/form/input';
import { Modal } from 'components/common/modal/modal';
import {
	useGetCityByStateId,
	useGetCountries,
	useGetStateByCountryId
} from 'hooks/data-fetching/use-countries.hooks';
import { addAddress } from 'lib/customer/addres.lib';
import { Fragment, useState } from 'react';
import { useAuthStore } from 'store/auth';

const AddAddressModal = (props: {
	isOpen: boolean;
	onAddressAdded: () => void;
	onCancel: () => void;
}) => {
	const { isOpen, onAddressAdded, onCancel } = props;
	const { customerData } = useAuthStore((state) => ({
		customerData: state.customerData
	}));

	const [firstName, lastName] = customerData.name?.split(' ') || [
		'',
		''
	];

	const [buyerAddress, setBuyerAddress] = useState({
		first_name: firstName || '',
		last_name: lastName || '',
		address_line1: '',
		address_line2: '',
		address_line_1: '',
		address_line3: '',
		postal_code: '',
		country_id: '',
		state_id: '',
		city_id: '',
		is_default: false,
		is_billing_address: false,
		buyer_id: customerData.buyerId || ''
	});
	const { countries } = useGetCountries();
	const { data: stateList } = useGetStateByCountryId(
		buyerAddress.country_id || ''
	);
	const { data: cityList } = useGetCityByStateId(
		buyerAddress.state_id || ''
	);
	const onChangeHandler = (
		event: React.FormEvent<HTMLInputElement>
	) => {
		const { name, value, type } = event?.currentTarget;

		setBuyerAddress((prevAddressInfo: any) => {
			let inputValue: any = value;
			if (type === 'checkbox') {
				const prevState = prevAddressInfo[name];
				inputValue = !prevState;
			}
			console.log({ type, name, inputValue });

			return {
				...prevAddressInfo,
				[name]: inputValue
			};
		});
	}; // End of onChangeHandler

	const onSaveClick = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			// if (buyerAddress.is_default?.toString() === 'true') {
			// 	buyerAddress.is_default = true;
			// } else {
			// 	buyerAddress.is_default = false;
			// }

			// if (buyerAddress.is_billing_address?.toString() === 'true') {
			// 	buyerAddress.is_billing_address = true;
			// } else {
			// 	buyerAddress.is_billing_address = false;
			// }

			await addAddress(buyerAddress);
			onAddressAdded();
		} catch (error) {}
	}; // End of onSaveClick

	return (
		<Modal
			open={isOpen}
			onClose={() => {}}
			overlayClassName="!bg-white top-[80px] z-[4000]"
			className="!top-[128px] z-[4006] w-full"
		>
			<div className="flex h-full items-center justify-center md:mt-16">
				<form
					onSubmit={onSaveClick}
					className="h-screen w-11/12 space-y-4 overflow-x-auto md:w-1/3"
				>
					<div className="grid grid-cols-12">
						<label className="col-span-12 md:col-span-4">
							Address Line 1
						</label>

						<div className="col-span-11 md:col-span-5">
							<Input
								className="w-full"
								name="address_line1"
								onChange={onChangeHandler}
								required={true}
							/>
						</div>
					</div>
					<div className="grid grid-cols-12">
						<label className="col-span-12 md:col-span-4">
							Address Line 2
						</label>
						<div className="col-span-11 md:col-span-5">
							<Input
								className="w-full"
								name="address_line2"
								onChange={onChangeHandler}
								required={true}
							/>
						</div>
					</div>
					<div className="grid grid-cols-12">
						<label className="col-span-12 md:col-span-4">
							Address Line 3
						</label>
						<div className="col-span-11 md:col-span-5">
							<Input
								className="w-full"
								name="address_line3"
								onChange={onChangeHandler}
								required={true}
							/>
						</div>
					</div>
					<div className="grid grid-cols-12">
						<label className="col-span-12 md:col-span-4">Zipcode</label>
						<div className="col-span-11 md:col-span-5">
							<Input
								className="w-full"
								name="postal_code"
								onChange={onChangeHandler}
								required={true}
							/>
						</div>
					</div>
					<div className="grid grid-cols-12">
						<label className="col-span-12 md:col-span-4">Country</label>
						<div className="col-span-11 md:col-span-5">
							<SearchableDropDown
								list={countries?.map((country: any) => ({
									id: country.id,
									value: country.id,
									label: country?.name?.en || ''
								}))}
								onChange={(data) =>
									setBuyerAddress((prevAddressInfo) => ({
										...prevAddressInfo,
										country_id: data.value
									}))
								}
							/>
						</div>
					</div>
					<div className="grid grid-cols-12">
						<label className="col-span-12 md:col-span-4">State</label>
						<div className="col-span-11 md:col-span-5">
							<SearchableDropDown
								list={stateList?.map((state: any) => ({
									id: state.id,
									value: state.id,
									label: state?.name?.en || ''
								}))}
								onChange={(data) =>
									setBuyerAddress((prevAddressInfo) => ({
										...prevAddressInfo,
										state_id: data.value
									}))
								}
							/>
						</div>
					</div>
					<div className="grid grid-cols-12">
						<label className="col-span-12 md:col-span-4">City</label>
						<div className="col-span-11 md:col-span-5">
							<SearchableDropDown
								list={cityList?.map((city: any) => ({
									id: city.id,
									value: city.id,
									label: city?.name?.en || ''
								}))}
								onChange={(data) =>
									setBuyerAddress((prevAddressInfo) => ({
										...prevAddressInfo,
										city_id: data.value
									}))
								}
							/>
						</div>
					</div>
					<div className="grid grid-cols-12">
						<div className="col-span-12 md:col-span-4">
							<Input
								type="checkbox"
								className="h-5 w-5"
								name="is_billing_address"
								value={buyerAddress.is_billing_address}
								onChange={onChangeHandler}
							/>
						</div>
						<label className="col-span-8">
							Is the Entered Address your Billing Address?
						</label>
					</div>
					<div className="grid grid-cols-12">
						<div className="col-span-12 md:col-span-4">
							<Input
								type="checkbox"
								className="h-5 w-5"
								name="is_default"
								value={buyerAddress.is_default}
								onChange={onChangeHandler}
							/>
						</div>
						<label className="col-span-8">
							Set Entered Address as Default Address?
						</label>
					</div>

					<div className="flex space-x-2 pb-40 pt-16 md:justify-center">
						<Button type="submit" variant="buyer">
							Save
						</Button>
						<Button
							className="border border-cyan !text-cyan"
							onClick={onCancel}
						>
							Cancel
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default AddAddressModal;

interface ISearchableDropDown {
	list: {
		id: string;
		label: string;
		value: any;
		[key: string]: any;
	}[];
	initialValue?: {
		id: string;
		label: string;
		value: any;
		[key: string]: any;
	};
	onChange: (data?: any) => any;
}

const SearchableDropDown: React.FC<ISearchableDropDown> = (props) => {
	const { list = [], initialValue, onChange } = props;

	const [selected, setSelected] = useState(initialValue);
	const [query, setQuery] = useState('');

	const filteredList =
		query === ''
			? list
			: list.filter((data) =>
					data.label
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  );

	return (
		<Combobox
			value={selected}
			onChange={(value) => {
				setSelected(value);
				onChange(value);
			}}
		>
			<div className="relative w-full">
				<div className="relative">
					<Combobox.Input
						className="h-10 w-full rounded-md border-2 border-accent-primary-main pl-8 pr-4 focus:outline-none"
						displayValue={(data: any) => data?.label}
						onChange={(event) => setQuery(event.target.value)}
					/>
					<Combobox.Button className="absolute inset-y-0 right-0 flex items-center">
						<ChevronUpDownIcon
							className="text-gray-400 h-5 w-5"
							aria-hidden="true"
						/>
					</Combobox.Button>
				</div>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					afterLeave={() => setQuery('')}
				>
					<Combobox.Options className="absolute z-[40002] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{filteredList.length === 0 && query !== '' ? (
							<div className="text-gray-700 relative cursor-default select-none py-2 px-4">
								Nothing found.
							</div>
						) : (
							filteredList.map((data) => (
								<Combobox.Option
									key={data.id}
									className={({ active, selected }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${
											active || selected
												? 'bg-primary-main text-white'
												: 'text-gray-900'
										}`
									}
									value={data}
								>
									<span>{data.label}</span>
								</Combobox.Option>
							))
						)}
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	);
};
